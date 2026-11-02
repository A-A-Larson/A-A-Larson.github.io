// app/repositories/[tech]/page.jsx
import React from 'react';
import RepositoryCard from '../../components/RepositoryCard';

async function fetchRepoData(tech) {
  const endpoint = `https://api.github.com/search/repositories?q=user:A-A-Larson+topic:${tech}`;
  // Static export: data is fixed at build time. GITHUB_TOKEN (set in CI) avoids the
  // 60 req/hr unauthenticated rate limit.
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch repository data');
  }
  return res.json();
}

async function fetchRepoReadme(repo) {
  const readmeEndpoint = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`;
  const response = await fetch(readmeEndpoint);
  if (!response.ok) {
    return null;
  }
  return response.text();
}

function extractFirstImageUrl(markdown) {
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = regex.exec(markdown);
  return match ? match[1] : null;
}

export default async function RepositoryPage({ params }) {
  // Await params to ensure it's resolved (Next.js 15+)
  const resolvedParams = await params;
  const { tech } = resolvedParams;
  
  // Add safety check
  if (!tech) {
    return (
      <main className="p-4">
        <h1>Technology parameter is missing</h1>
      </main>
    );
  }

  let repoData;

  try {
    repoData = await fetchRepoData(tech);
  } catch (error) {
    return (
      <main className="p-4">
        <h1>Error fetching repository info for {tech.toUpperCase()}</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  // Enrich each repository object with the image URL from its README.md (if any)
  const enrichedRepos = await Promise.all(
    repoData.items.map(async (repo) => {
      const readmeMarkdown = await fetchRepoReadme(repo);
      let readmeImageUrl = null;
      if (readmeMarkdown) {
        readmeImageUrl = extractFirstImageUrl(readmeMarkdown);
      }
      return { ...repo, readmeImageUrl };
    })
  );

  return (
    <main className="techPageMain p-4 text-lightHdrClr dark:text-darkHdrClr bg-lightBG dark:bg-darkBG">
      <h1 className="techPageH1 text-2xl font-bold mb-6">{tech.toUpperCase()} Projects</h1>
      {enrichedRepos.length === 0 ? (
        <p>No repositories found using the topic &quot;{tech}&quot;.</p>
      ) : (
        <div className="projectDetailsSection bg-lightBG dark:bg-darkBG grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrichedRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </main>
  );
}

// Add this to pre-generate static pages
export async function generateStaticParams() {
  return [
    { tech: 'react' },
    { tech: 'python' },
    { tech: 'sql' },
    { tech: 'tailwind' },
    { tech: 'java' },
    { tech: 'javascript' },
    { tech: 'css' },
    { tech: 'flutter' },
  ];
}