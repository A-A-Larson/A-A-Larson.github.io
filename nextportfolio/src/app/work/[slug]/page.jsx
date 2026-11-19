import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, projectPath, backToWorkPath } from '../../data/work';
import ThemeButton from '../../components/ThemeButton';
import { Carousel, SlideshowProvider } from '../../components/Slideshow';

// Static export: only the slugs in data/work.js exist. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Andrew Larson's Portfolio`,
    description: project.pitch ?? project.desc,
  };
}

const KIND_LABEL = {
  hand: 'Hand-coded · No AI assistance',
  ai: 'AI-assisted · Built with AI tooling',
};

function Tags({ tags, label }) {
  return (
    <ul className='workTags' aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className='workTag'>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Pager({ project }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <nav className='projPager' aria-label='Project navigation'>
      <Link href={backToWorkPath(project.kind)} className='workLink'>
        ← Back to work
      </Link>
      <Link href={projectPath(next.slug)} className='workLink'>
        Next: {next.title} →
      </Link>
    </nav>
  );
}

function FeaturedDetail({ project }) {
  return (
    <>
      <header className='projHead'>
        <p className='workEyebrow'>{project.eyebrow}</p>
        <h1 className='projTitle'>{project.title}</h1>
        <p className='projLede'>{project.pitch}</p>
        <div className='projBtns'>
          <a href={project.siteUrl} target='_blank' rel='noopener noreferrer' className='projBtn'>
            Visit pollthevote.com ↗
          </a>
        </div>
      </header>

      <Carousel shots={project.screenshots} title={project.title} />

      <dl className='projFacts'>
        {project.facts.map((f) => (
          <div key={f.label}>
            <dt className='projFactLabel'>{f.label}</dt>
            <dd className='projFactValue'>{f.value}</dd>
          </div>
        ))}
      </dl>

      <section className='projSec' aria-labelledby='product-heading'>
        <h2 id='product-heading'>The product</h2>
        {project.product.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className='projSec' aria-labelledby='built-heading'>
        <h2 id='built-heading'>What I built</h2>
        <div className='projBuilt'>
          {project.built.map((group) => (
            <div key={group.heading} className='projBuiltCard'>
              <h3>{group.heading}</h3>
              <ul>
                {group.items.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
              {group.note && <p className='workNote'>{group.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className='projSec' aria-labelledby='walk-heading'>
        <h2 id='walk-heading'>Feature walkthroughs</h2>
        {project.walkthroughs.map((w) => (
          <div key={w.title} className='projWalk'>
            <Image src={w.image} alt={w.imageAlt} className='projWalkImg' sizes='190px' />
            <div className='projWalkText'>
              <h3>{w.title}</h3>
              <p>
                <span className='workLabel'>What it does</span>
                <br />
                {w.does}
              </p>
              <p>
                <span className='workLabel'>What I built</span>
                <br />
                {w.built}
              </p>
            </div>
          </div>
        ))}
        <p className='workNote'>Screenshots are from my own account, with names and personal data blurred or replaced where needed.</p>
      </section>

      <p className='workNote'>{project.privateNote}</p>
    </>
  );
}

function RepoDetail({ project }) {
  const isAi = project.kind === 'ai';
  return (
    <>
      <header className='projHead'>
        <p className='workEyebrow'>{KIND_LABEL[project.kind]}</p>
        <h1 className='projTitle'>{project.title}</h1>
        <p className='projLede'>{project.desc}</p>
        {project.note && <p className='workNote'>{project.note}</p>}
        <div className='projBtns'>
          <a href={project.url} target='_blank' rel='noopener noreferrer' className='projBtn'>
            View on GitHub ↗
          </a>
        </div>
      </header>

      <Carousel shots={project.screenshots} title={project.title} />

      {project.story?.map((section) => (
        <section key={section.heading} className='projSec' aria-label={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((text) => (
            <p key={text} className='workMuted'>
              {text}
            </p>
          ))}
        </section>
      ))}

      {isAi && (project.aiHelped || project.owned) && (
        <section className='projSec' aria-label='How AI was used'>
          {project.aiHelped && (
            <div>
              <p className='workLabel'>How AI helped</p>
              <p className='workMuted'>{project.aiHelped}</p>
            </div>
          )}
          {project.owned && (
            <div>
              <p className='workLabel'>What I owned</p>
              <p className='workMuted'>{project.owned}</p>
            </div>
          )}
        </section>
      )}

      <Tags tags={project.tags} label='Technologies' />
    </>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className='workWrap projPage text-lightHdrClr dark:text-darkHdrClr'>
      <SlideshowProvider>
      <article className='projDetail'>
        <div className='projTop'>
          <Link href={backToWorkPath(project.kind)} className='workLink'>
            ← Back to work
          </Link>
          <ThemeButton />
        </div>
        {project.kind === 'featured' ? <FeaturedDetail project={project} /> : <RepoDetail project={project} />}
        <Pager project={project} />
      </article>
      </SlideshowProvider>
    </main>
  );
}
