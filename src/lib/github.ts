const OWNER = "Poet-Philosopher";

export interface RepoMeta {
  name: string;
  url: string;
  stars: number;
  languages: string[];
  /** ISO date of the last push to the default branch */
  pushedAt: string;
}

export interface GithubResult {
  /** false when the API call failed (rate limit, network). Cards then render without live stats. */
  ok: boolean;
  repos: Record<string, RepoMeta>;
}

interface ApiRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  languages_url: string;
}

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function getGithubRepos(wanted: string[]): Promise<GithubResult> {
  try {
    const res = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed&type=owner`, {
      headers: headers(),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);
    const all = (await res.json()) as ApiRepo[];
    const wantedSet = new Set(wanted.map((w) => w.toLowerCase()));
    const matched = all.filter((r) => wantedSet.has(r.name.toLowerCase()));

    const repos: Record<string, RepoMeta> = {};
    await Promise.all(
      matched.map(async (r) => {
        let languages = r.language ? [r.language] : [];
        try {
          const lr = await fetch(r.languages_url, { headers: headers(), next: { revalidate: 3600 }, signal: AbortSignal.timeout(8_000) });
          if (lr.ok) {
            const bytes = (await lr.json()) as Record<string, number>;
            const sorted = Object.entries(bytes).sort((a, b) => b[1] - a[1]).map(([lang]) => lang).slice(0, 3);
            if (sorted.length) languages = sorted;
          }
        } catch {
          /* keep the primary language */
        }
        repos[r.name.toLowerCase()] = {
          name: r.name,
          url: r.html_url,
          stars: r.stargazers_count,
          languages,
          pushedAt: r.pushed_at,
        };
      }),
    );
    return { ok: true, repos };
  } catch (error) {
    console.warn("[github] falling back to static project data:", error);
    return { ok: false, repos: {} };
  }
}

export const githubProfileUrl = `https://github.com/${OWNER}`;
export const repoUrl = (name: string) => `https://github.com/${OWNER}/${name}`;
