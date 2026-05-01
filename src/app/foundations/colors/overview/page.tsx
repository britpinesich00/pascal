export default function ColorsOverviewPage() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <p className="max-w-prose text-lg text-surface-foreground-muted">
          Pascal uses a two-layer color architecture — primitive palettes that
          define every available hue and step, and semantic tokens that give
          those colors purpose within a UI. The two layers are connected, but
          intentionally separated.
        </p>
      </div>

      {/* Architecture explainer */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary-muted">
              <span className="font-mono text-xs font-semibold text-brand-primary">01</span>
            </div>
            <h2 className="text-base font-semibold text-surface-foreground">
              Primitive tokens
            </h2>
          </div>
          <p className="text-sm text-surface-foreground-muted">
            Raw color scales — every shade of blue, neutral, red, and more —
            defined once per brand. Primitives are the atoms of the system.
            They carry no meaning on their own; a designer never reaches for{" "}
            <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
              blue-50
            </code>{" "}
            directly in production UI.
          </p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary-muted">
              <span className="font-mono text-xs font-semibold text-brand-primary">02</span>
            </div>
            <h2 className="text-base font-semibold text-surface-foreground">
              Semantic tokens
            </h2>
          </div>
          <p className="text-sm text-surface-foreground-muted">
            Role-based names like{" "}
            <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
              color-surface
            </code>{" "}
            or{" "}
            <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
              color-brand
            </code>{" "}
            that reference a primitive. Semantic tokens are what components
            consume — they stay stable while the underlying primitive can vary
            per brand or theme.
          </p>
        </div>
      </div>

      {/* Multi-brand rationale */}
      <div className="space-y-4 rounded-2xl border border-surface-border bg-surface-elevated p-8">
        <h2 className="text-lg font-semibold text-surface-foreground">
          Why a multi-brand token architecture?
        </h2>
        <div className="space-y-3 max-w-prose">
          <p className="text-sm text-surface-foreground-muted">
            Pascal serves three distinct brands — Disney+, Hulu, and ESPN —
            each with its own visual identity. Rather than maintaining three
            separate component libraries, Pascal uses a single component layer
            that reads from brand-aware semantic tokens.
          </p>
          <p className="text-sm text-surface-foreground-muted">
            At build time (or at runtime via a theme context), the semantic
            token layer resolves to the correct primitive for the active brand.
            A button that uses{" "}
            <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
              color-brand
            </code>{" "}
            will automatically appear teal on Disney+, green on Hulu, and red
            on ESPN — without any conditional logic in the component itself.
          </p>
          <p className="text-sm text-surface-foreground-muted">
            This separation also makes brand maintenance tractable: updating
            Hulu&rsquo;s primary green means changing one primitive reference
            in the semantic token map, not auditing every component that uses
            that color.
          </p>
        </div>
      </div>

      {/* Layer diagram */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-surface-foreground">
          How the layers connect
        </h2>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-surface-foreground">
            Brand palette
          </span>
          <span className="text-surface-foreground-subtle">→</span>
          <span className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-surface-foreground">
            Primitive token{" "}
            <span className="text-brand-primary">(blue-50)</span>
          </span>
          <span className="text-surface-foreground-subtle">→</span>
          <span className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-surface-foreground">
            Semantic token{" "}
            <span className="text-brand-primary">(color-brand)</span>
          </span>
          <span className="text-surface-foreground-subtle">→</span>
          <span className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2 text-surface-foreground">
            Component
          </span>
        </div>
      </div>
    </div>
  );
}
