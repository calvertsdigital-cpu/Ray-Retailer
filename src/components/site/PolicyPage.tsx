/** Shared layout for the site's information / policy pages. */
export interface PolicySection {
  heading: string;
  body: string[];
  items?: string[];
}

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
  updated = "September 2026",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
  updated?: string;
}) {
  return (
    <div className="container-rhl section-y max-w-3xl">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h1 className="heading-1">{title}</h1>
      <p className="mt-3 text-muted-foreground">{intro}</p>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="heading-2">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-muted-foreground">
              {s.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {s.items && (
                <ul className="ml-5 list-disc space-y-1.5">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
