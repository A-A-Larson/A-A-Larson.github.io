'use client';
import { useInView } from 'react-intersection-observer';

function TimelineItem({ entry }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <li
      ref={ref}
      className={`timelineItem ${inView ? 'timelineItem-visible' : ''}`}
    >
      <span
        className='timelineMarker bg-lightBttnBG dark:bg-darkBttnBG'
        aria-hidden='true'
      />
      {entry.when && <p className='timelineWhen'>{entry.when}</p>}
      <h3 className='timelineTitle'>{entry.title}</h3>
      {entry.org && <p className='timelineOrg'>{entry.org}</p>}
      {entry.summary && <p className='timelineSummary'>{entry.summary}</p>}
      {entry.tags && entry.tags.length > 0 && (
        <ul className='timelineTags' aria-label='Skills and tools'>
          {entry.tags.map((tag) => (
            <li key={tag} className='timelineTag border border-lightHdrClr dark:border-darkHdrClr'>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Timeline({ entries }) {
  return (
    <ol className='timeline' aria-label='Career timeline, newest first'>
      {entries.map((entry) => (
        <TimelineItem key={`${entry.when}-${entry.title}`} entry={entry} />
      ))}
    </ol>
  );
}
