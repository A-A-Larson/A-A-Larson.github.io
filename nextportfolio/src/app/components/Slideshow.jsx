'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { FaPause, FaPlay } from 'react-icons/fa';

// Screenshot slideshows. One shared clock (SlideshowProvider) drives every slideshow inside it, so all
// cards on the home page change image at the same moment. Autoplay stops for visitors who prefer
// reduced motion, while a card is hovered or focused, and when the visitor presses Pause.
const INTERVAL_MS = 4500;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getReducedMotionOnServer = () => true;

const SlideshowContext = createContext(null);

export function SlideshowProvider({ children }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionOnServer);
  const [tick, setTick] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [holds, setHolds] = useState(0); // slideshows currently hovered or focused
  const paused = reduced || userPaused || holds > 0;

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const hold = useCallback(() => setHolds((n) => n + 1), []);
  const release = useCallback(() => setHolds((n) => Math.max(0, n - 1)), []);
  const toggleUserPaused = useCallback(() => setUserPaused((p) => !p), []);

  const value = useMemo(
    () => ({ tick, reduced, userPaused, toggleUserPaused, hold, release }),
    [tick, reduced, userPaused, toggleUserPaused, hold, release]
  );
  return <SlideshowContext.Provider value={value}>{children}</SlideshowContext.Provider>;
}

function useSlideshow() {
  const value = useContext(SlideshowContext);
  if (!value) throw new Error('Slideshow components must be used inside <SlideshowProvider>.');
  return value;
}

// Pause the shared clock while the pointer or keyboard focus is inside the element.
export function useHoldHandlers() {
  const { hold, release } = useSlideshow();
  return { onMouseEnter: hold, onMouseLeave: release, onFocus: hold, onBlur: release };
}

// Stacked images that cross-fade. Only the active image has alt text and is exposed to assistive tech.
function SlideStack({ shots, active, sizes, className = '' }) {
  return (
    <div className={`slides ${className}`}>
      {shots.map((shot, i) => (
        <Image
          key={shot.src.src}
          src={shot.src}
          alt={i === active ? shot.alt : ''}
          aria-hidden={i === active ? undefined : true}
          className={`slide ${i === active ? 'slideActive' : ''}`}
          sizes={sizes}
          priority={className.includes('slidesPriority') && i === 0}
        />
      ))}
    </div>
  );
}

// Image area of a card on the home page. Follows the shared clock.
export function CardSlides({ shots, sizes, className }) {
  const { tick } = useSlideshow();
  if (!shots || shots.length === 0) return null;
  return <SlideStack shots={shots} active={tick % shots.length} sizes={sizes} className={className} />;
}

// Pause / play button for every slideshow on the page. Hidden when nothing moves.
export function SlideshowToggle() {
  const { reduced, userPaused, toggleUserPaused } = useSlideshow();
  if (reduced) return null;
  return (
    <button type='button' className='workSlideToggle' onClick={toggleUserPaused} aria-pressed={userPaused}>
      {userPaused ? <FaPlay size={11} aria-hidden='true' /> : <FaPause size={11} aria-hidden='true' />}
      {userPaused ? 'Play screenshots' : 'Pause screenshots'}
    </button>
  );
}

// Larger slideshow for a detail page: autoplay on the shared clock, plus previous / next buttons and dots.
export function Carousel({ shots, title }) {
  const { tick, reduced, userPaused, toggleUserPaused, hold, release } = useSlideshow();
  const [offset, setOffset] = useState(0); // set by the buttons; the clock keeps running from there
  const count = shots.length;
  if (count === 0) return null;

  const active = (((tick + offset) % count) + count) % count;
  const step = (delta) => setOffset((o) => o + delta);
  const jumpTo = (index) => setOffset(index - tick);
  const shot = shots[active];

  return (
    <figure
      className='carousel'
      aria-roledescription='carousel'
      aria-label={`${title} screenshots`}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
    >
      <SlideStack shots={shots} active={active} sizes='(min-width: 920px) 880px, 100vw' className='slidesPriority carouselSlides' />
      {count > 1 && (
        <div className='carouselBar'>
          <button type='button' className='carouselBtn' onClick={() => step(-1)} aria-label='Previous screenshot'>
            ‹
          </button>
          <ul className='carouselDots'>
            {shots.map((s, i) => (
              <li key={s.src.src}>
                <button
                  type='button'
                  className='carouselDot'
                  onClick={() => jumpTo(i)}
                  aria-label={`Show screenshot ${i + 1} of ${count}`}
                  aria-current={i === active ? 'true' : undefined}
                />
              </li>
            ))}
          </ul>
          <button type='button' className='carouselBtn' onClick={() => step(1)} aria-label='Next screenshot'>
            ›
          </button>
          {!reduced && (
            <button
              type='button'
              className='carouselBtn'
              onClick={toggleUserPaused}
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {userPaused ? <FaPlay size={12} aria-hidden='true' /> : <FaPause size={12} aria-hidden='true' />}
            </button>
          )}
        </div>
      )}
      {shot.caption && <figcaption className='carouselCaption'>{shot.caption}</figcaption>}
    </figure>
  );
}
