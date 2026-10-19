import { groups, projects, type Project } from "@/data/projects";
import { getGithubRepos, repoUrl, type RepoMeta } from "@/lib/github";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";

export async function Projects() {
  const gh = await getGithubRepos(projects.flatMap((p) => (p.repo ? [p.repo] : [])));

  return (
    <Section id="projects">
      <SectionHeading id="projects" title="Projects">
        Each entry states the problem, what I built and how it was checked.
      </SectionHeading>

      <div className="space-y-20">
        {groups.map((g) => (
          <div key={g.id}>
            <Reveal>
              <h3 className="font-serif text-2xl">{g.title}</h3>
              <p className="mt-1 max-w-prose font-sans text-sm text-muted">{g.blurb}</p>
            </Reveal>
            <div className="mt-6 divide-y divide-rule border-y border-ink/25">
              {projects
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <ProjectEntry key={p.slug} project={p} meta={p.repo ? gh.repos[p.repo.toLowerCase()] : undefined} githubOk={gh.ok} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProjectEntry({ project: p, meta, githubOk }: { project: Project; meta?: RepoMeta; githubOk: boolean }) {
  // If GitHub answered and the repo is not in the public list, hide the Code button rather than link to a 404.
  const showCode = Boolean(p.repo) && (!githubOk || Boolean(meta));
  const visible = p.details.slice(0, 2);
  const more = p.details.slice(2);

  return (
    <article className="grid gap-8 py-10 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="font-serif text-2xl leading-tight">{p.title}</h4>
          {p.period && <span className="shrink-0 font-mono text-xs text-muted">{p.period}</span>}
        </div>
        {p.tag && <p className="mt-1 font-sans text-xs text-muted">{p.tag}</p>}
        <p className="mt-3 font-serif italic text-muted">{p.epigraph}</p>
        <p className="mt-5">{p.problem}</p>

        <div className={`mt-6 flex flex-wrap gap-3 ${p.liveUrl || showCode ? "" : "hidden"}`}>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Live app<span className="sr-only">: {p.title}</span>
            </a>
          )}
          {showCode && (
            <a href={meta?.url ?? repoUrl(p.repo as string)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              Code<span className="sr-only">: {p.title}</span>
            </a>
          )}
        </div>
        {p.sleeps && p.liveUrl && <p className="mt-2 font-sans text-xs text-muted">May take a few seconds to wake.</p>}
      </div>

      <div className="md:col-span-7">
        <p className="font-sans text-sm font-medium">What I built</p>
        <p className="mt-1">{p.built}</p>

        {p.details.length > 0 && (
          <>
            <ul className="mt-4 space-y-3 border-l border-rule pl-5 text-[0.97rem]">
              {visible.map((d) => (
                <li key={d.slice(0, 30)}>{d}</li>
              ))}
            </ul>
            {more.length > 0 && (
              <details className="group mt-3">
                <summary className="inline-flex cursor-pointer list-none font-sans text-sm text-muted underline decoration-ink/30 underline-offset-4 hover:text-accent group-open:hidden">
                  Show {more.length} more technical details
                </summary>
                <ul className="space-y-3 border-l border-rule pl-5 text-[0.97rem]">
                  {more.map((d) => (
                    <li key={d.slice(0, 30)}>{d}</li>
                  ))}
                </ul>
              </details>
            )}
          </>
        )}

        {p.stack.length > 0 && <p className="mt-5 font-mono text-xs leading-relaxed text-muted">{p.stack.join(", ")}</p>}

        {meta && (
          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
            <div className="flex gap-1.5"><dt>Stars</dt><dd className="text-ink">{meta.stars}</dd></div>
            {meta.languages.length > 0 && (
              <div className="flex gap-1.5"><dt>Languages</dt><dd className="text-ink">{meta.languages.join(", ")}</dd></div>
            )}
            <div className="flex gap-1.5"><dt>Last push</dt><dd className="text-ink">{formatDate(meta.pushedAt)}</dd></div>
          </dl>
        )}
      </div>
    </article>
  );
}
