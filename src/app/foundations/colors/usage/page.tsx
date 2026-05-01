export default function ColorsUsagePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-surface-foreground">
          Usage guidelines
        </h2>
        <p className="max-w-prose text-surface-foreground-muted">
          Guidance on applying Pascal color tokens in layouts, components, and
          interactive states.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-surface-border bg-surface-subtle px-8 py-20 text-center">
        <div className="mx-auto max-w-sm space-y-3">
          <h3 className="text-xl font-semibold text-surface-foreground">
            Coming soon
          </h3>
          <p className="text-surface-foreground-muted">
            Usage documentation is currently being authored. Check back once
            the semantic token layer is fully finalized across all three brands.
          </p>
        </div>
      </div>
    </div>
  );
}
