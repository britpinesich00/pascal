// ── Section wrapper ────────────────────────────────────────────────────────

function Section({
  title,
  children,
  first = false,
}: {
  title: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      className={`space-y-6 ${first ? "" : "border-t border-surface-border pt-12"}`}
    >
      <h2 className="text-xl font-semibold text-surface-foreground">{title}</h2>
      {children}
    </section>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    title: "Role-based & purposeful",
    description:
      "Every text style is assigned a clear role so designers and engineers make choices based on intent, not aesthetics. This ensures consistent hierarchy and tone across experiences.",
  },
  {
    title: "Scalable & tokenized",
    description:
      "Typography values like size, weight, and line height are defined as tokens that adapt fluidly across breakpoints and devices. This creates a seamless bridge between design and development, keeping updates consistent and future-proof.",
  },
  {
    title: "Global & inclusive",
    description:
      "The system is designed to perform across languages, scripts, and writing directions. Whether users are reading in Arabic, Japanese, or English, typography maintains balance, clarity, and brand cohesion everywhere.",
  },
];

const ROLES = [
  {
    name: "Display",
    description:
      "Reserved for high-impact marketing use: hero banners, campaign messaging, and promotional moments. Expressive and bold, never used in product UI.",
    previewText: "Display",
    previewSize: "2.5rem",
    previewWeight: "700",
    previewLineHeight: "1.1",
  },
  {
    name: "Headline",
    description:
      "Provide structure and hierarchy across experiences. Used for section titles, key messages, and layout anchors.",
    previewText: "Headline",
    previewSize: "1.75rem",
    previewWeight: "600",
    previewLineHeight: "1.2",
  },
  {
    name: "Label",
    description:
      "Utilitarian and compact, used within UI components like buttons, tags, inputs, and navigation. Prioritizes legibility at small sizes.",
    previewText: "Label",
    previewSize: "0.875rem",
    previewWeight: "600",
    previewLineHeight: "1.4",
  },
  {
    name: "Body",
    description:
      "Carries most of the reading weight across products. Optimized for comfort and accessibility, ideal for paragraphs, supporting text, and long-form content.",
    previewText:
      "Body text carries most of the reading weight across products.",
    previewSize: "1rem",
    previewWeight: "400",
    previewLineHeight: "1.625",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function TypographyOverviewPage() {
  return (
    <div className="space-y-12">
      {/* 1. Principles */}
      <Section title="Principles" first>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              style={{
                backgroundColor: "var(--color-surface-elevated)",
                border: "1px solid var(--color-surface-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-6)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--font-size-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-surface-foreground)",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-surface-foreground-muted)",
                  lineHeight: "var(--line-height-relaxed)",
                  margin: 0,
                }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <p className="max-w-prose text-surface-foreground-muted">
          Typography is built from modular values expressed as tokens and
          variables. Each role maps to a defined set of font size, line height,
          weight, tracking, and font family tokens. These tokens connect design
          and code, maintaining visual and functional parity across platforms.
        </p>
      </Section>

      {/* 3. Roles */}
      <Section title="Roles">
        <div className="divide-y divide-surface-border overflow-hidden rounded-xl border border-surface-border">
          {ROLES.map((role) => (
            <div
              key={role.name}
              className="grid grid-cols-1 gap-6 bg-surface-elevated p-6 md:grid-cols-2 md:items-center"
            >
              {/* Description */}
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-surface-foreground">
                  {role.name}
                </p>
                <p className="text-sm text-surface-foreground-muted">
                  {role.description}
                </p>
              </div>
              {/* Live preview */}
              <div
                className="overflow-hidden rounded-lg bg-surface-canvas px-6 py-5"
                style={{ border: "1px solid var(--color-surface-border)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-family-base, var(--font-family-sans))",
                    fontSize: role.previewSize,
                    fontWeight: role.previewWeight,
                    lineHeight: role.previewLineHeight,
                    color: "var(--color-surface-foreground)",
                    margin: 0,
                  }}
                >
                  {role.previewText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Sizes */}
      <Section title="Sizes">
        <p className="max-w-prose text-surface-foreground-muted">
          Within each role, Pascal uses four key sizes to ensure a clear
          typographic scale and rhythm: X Small, Small, Medium, and Large.
        </p>
      </Section>

      {/* 5. Usage */}
      <Section title="Usage">
        <div className="max-w-prose space-y-4">
          <p className="text-surface-foreground-muted">
            Typography is the visual voice of the Disney Streaming experience.
            It defines how our products speak: clear, confident, and accessible
            across every platform and region.
          </p>
          <p className="text-surface-foreground-muted">
            Our typography system establishes hierarchy, rhythm, and consistency
            across Disney+, Hulu, and ESPN, ensuring each brand feels distinct
            yet unified under the same design principles.
          </p>
        </div>
      </Section>
    </div>
  );
}
