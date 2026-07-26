export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-secondary)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-on-surface)] sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-[var(--color-on-surface-variant)] sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

