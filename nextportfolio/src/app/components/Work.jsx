'use client';
import { useInView } from 'react-intersection-observer';
import {
  intro,
  capabilities,
  tools,
  handCoded,
  aiAssisted,
  githubProfile,
} from '../data/work';

// Icon glyphs (24x24 viewBox), stroked in the tile's glyph color.
// pathLength=1 on every shape lets the CSS "draw in" animation work on all of them the same way.
const icons = {
  ui: (
    <>
      <rect x='3' y='4' width='18' height='16' rx='2' pathLength='1' />
      <path d='M3 10h18M9 10v10' pathLength='1' />
    </>
  ),
  data: (
    <>
      <ellipse cx='12' cy='6' rx='8' ry='3' pathLength='1' />
      <path d='M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6' pathLength='1' />
    </>
  ),
  test: (
    <>
      <circle cx='12' cy='12' r='9' pathLength='1' />
      <path d='M8 12.5l3 3 5-6' pathLength='1' />
    </>
  ),
  ai: <path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z' pathLength='1' />,
  ship: <path d='M12 19V5M5 12l7-7 7 7' pathLength='1' />,
  team: (
    <>
      <path d='M20 12a8 8 0 1 1-2.3-5.7' pathLength='1' />
      <path d='M20 4v5h-5' pathLength='1' />
    </>
  ),
};

const STAGGER_MS = 90;

// Scroll-in state for a card: stagger delay by position (two cards per row), and whether it has entered the viewport.
function useReveal(index) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const delay = (index % 2) * STAGGER_MS + Math.floor(index / 2) * STAGGER_MS * 2;
  return [
    ref,
    `workReveal ${inView ? 'workVisible' : ''}`,
    { '--workDelay': `${delay}ms` },
  ];
}

function Capability({ cap, index }) {
  const [revealRef, revealClass, revealStyle] = useReveal(index);

  return (
    <li ref={revealRef} className={`workCap ${revealClass}`} style={revealStyle}>
      <span className='workIcon workTile'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.75'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          {icons[cap.icon]}
        </svg>
      </span>
      <div className='workCapBody'>
        <h3 className='workCapTitle'>{cap.title}</h3>
        <p>{cap.desc}</p>
        <p className='workProof'>
          <span className='workProofLabel'>Proof</span>&nbsp; {cap.proof}
        </p>
      </div>
    </li>
  );
}

function Tags({ tags }) {
  return (
    <ul className='workTags' aria-label='Technologies'>
      {tags.map((tag) => (
        <li key={tag} className='workTag'>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function RepoCard({ repo, variant, index }) {
  const isAi = variant === 'ai';
  const [revealRef, revealClass, revealStyle] = useReveal(index);
  return (
    <li
      ref={revealRef}
      className={`workRepo ${isAi ? 'workRepoAi' : 'workRepoHand'} ${revealClass}`}
      style={revealStyle}
    >
      <h4 className='workRepoTitle'>
        <a href={repo.url} target='_blank' rel='noopener noreferrer' className='workLink'>
          {repo.title}
        </a>
      </h4>
      <p>{repo.desc}</p>
      {repo.note && <p className='workNote'>{repo.note}</p>}
      {isAi && repo.aiHelped && (
        <div>
          <p className='workLabel'>How AI helped</p>
          <p className='workMuted'>{repo.aiHelped}</p>
        </div>
      )}
      {isAi && repo.owned && (
        <div>
          <p className='workLabel'>What I owned</p>
          <p className='workMuted'>{repo.owned}</p>
        </div>
      )}
      <Tags tags={repo.tags} />
    </li>
  );
}

function RepoGroup({ group, id, variant }) {
  return (
    <section aria-labelledby={id} className='workGroup'>
      <div className='workGroupHead'>
        <div className='workGroupTitleRow'>
          <h3 id={id} className='workGroupTitle'>
            {group.heading}
          </h3>
          <span className={`workBadge ${variant === 'ai' ? 'workBadgeAi' : ''}`}>{group.badge}</span>
        </div>
        <p className='workBlurb'>{group.blurb}</p>
      </div>
      <ul className='workRepoGrid'>
        {group.repos.map((repo, i) => (
          <RepoCard key={repo.repo} repo={repo} variant={variant} index={i} />
        ))}
      </ul>
    </section>
  );
}

export default function Work() {
  return (
    <div className='workWrap text-lightHdrClr dark:text-darkHdrClr'>
      <header className='workHeader'>
        <h2 className='workHeading'>What I Can Do</h2>
        <p className='workIntro'>{intro}</p>
      </header>

      <section aria-label='Capabilities' className='workCaps'>
        <ul className='workCapGrid'>
          {capabilities.map((cap, i) => (
            <Capability key={cap.title} cap={cap} index={i} />
          ))}
        </ul>
        <div className='workTools'>
          <p className='workProof'>Tools I use right now:</p>
          <ul className='workToolList'>
            {tools.map((t) => (
              <li key={t} className='workToolChip'>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RepoGroup group={handCoded} id='hand-coded-heading' variant='hand' />
      <p className='workAll'>
        <a href={githubProfile} target='_blank' rel='noopener noreferrer' className='workLink'>
          See every repository on GitHub
        </a>
      </p>
      <RepoGroup group={aiAssisted} id='ai-assisted-heading' variant='ai' />
    </div>
  );
}
