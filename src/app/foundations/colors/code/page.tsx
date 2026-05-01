import { CodeBlock } from "@/components/ui/CodeBlock";

const CSS_EXAMPLE = `/* Reference a Pascal semantic token as a CSS variable */
.my-button {
  background-color: var(--color-brand-brand);
  color: var(--color-brand-on-brand);
}

/* Surface tokens */
.my-card {
  background-color: var(--color-surface-surface-container);
  border-color: var(--color-surface-outline);
}

/* System state tokens */
.error-message {
  color: var(--color-system-error-error);
  background-color: var(--color-system-error-error-container);
}`;

const TAILWIND_EXAMPLE = `{/* Pascal tokens map directly to Tailwind utility classes */}

{/* Brand / primary actions */}
<button className="bg-brand-brand text-brand-on-brand hover:bg-brand-brand-bright">
  Subscribe
</button>

{/* Surface containers */}
<div className="bg-surface-surface-container border border-surface-outline rounded-xl">
  Card content
</div>

{/* System states */}
<p className="text-system-error-error bg-system-error-error-container px-3 py-2 rounded-lg">
  Something went wrong
</p>`;

const TOKEN_NAMING_EXAMPLE = `/* Token naming pattern */
--color-{category}-{token-name}

/* Examples */
--color-brand-brand              → brand fill color
--color-brand-on-brand           → text on brand fill
--color-surface-surface          → default page background
--color-surface-on-surface       → primary text
--color-system-error-error       → error state
--color-inverse-inverse-surface  → inverse background`;

export default function ColorsCodePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-surface-foreground">
          Using color tokens in code
        </h2>
        <p className="max-w-prose text-surface-foreground-muted">
          Pascal color tokens are exposed as CSS custom properties and map
          one-to-one to Tailwind utility classes. Use semantic tokens — never
          primitive values — in component and layout code.
        </p>
      </div>

      {/* Token naming */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-surface-foreground">
          Token naming pattern
        </h3>
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          All color tokens follow a consistent{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            --color-{"{"}category{"}"}-{"{"}name{"}"}
          </code>{" "}
          naming convention. The category mirrors the semantic layer structure
          (surface, brand, inverse, system, etc.).
        </p>
        <CodeBlock code={TOKEN_NAMING_EXAMPLE} language="css" />
      </div>

      {/* CSS usage */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-surface-foreground">
          CSS / CSS Modules
        </h3>
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Reference tokens as CSS custom properties anywhere you write styles.
        </p>
        <CodeBlock code={CSS_EXAMPLE} language="css" />
      </div>

      {/* Tailwind usage */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-surface-foreground">
          Tailwind CSS
        </h3>
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Pascal&rsquo;s Tailwind config maps every token to a utility class.
          Replace{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            --color-
          </code>{" "}
          with a Tailwind color modifier like{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            bg-
          </code>{" "}
          or{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            text-
          </code>
          , and convert hyphens to the standard Tailwind pattern.
        </p>
        <CodeBlock code={TAILWIND_EXAMPLE} language="tsx" />
      </div>

      {/* Note on brand switching */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-6 space-y-2">
        <h3 className="text-sm font-semibold text-surface-foreground">
          Brand switching
        </h3>
        <p className="text-sm text-surface-foreground-muted max-w-prose">
          Semantic token values change per brand. Components that consume
          semantic tokens require no code changes to support multiple brands —
          only the token resolution layer changes. Never hardcode primitive
          values (e.g.{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            --color-teal-60
          </code>
          ) in component styles.
        </p>
      </div>
    </div>
  );
}
