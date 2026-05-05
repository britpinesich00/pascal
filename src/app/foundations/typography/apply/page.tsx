import { DoAndDont } from "@/components/ui/DoAndDont";

// ── Helpers ────────────────────────────────────────────────────────────────

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
      className={`space-y-5 ${first ? "" : "border-t border-surface-border pt-10"}`}
    >
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-surface-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-canvas)",
        border: "1px solid var(--color-surface-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-5) var(--spacing-6)",
      }}
    >
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-surface-foreground-muted)",
          lineHeight: "var(--line-height-relaxed)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function TypographyApplyPage() {
  return (
    <div className="space-y-10">
      {/* 1. Use brand fonts consistently */}
      <Section title="Use brand fonts consistently" first>
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Each brand mode applies its own typeface automatically. Designers
          should rely on semantic text styles instead of picking fonts manually.
          Mixing typefaces from different brands breaks identity and creates
          unnecessary inconsistency.
        </p>
        <DoAndDont
          doLabel="Use the brand's assigned typeface for all text in the experience."
          dontLabel="Don't mix fonts from other brand modes."
        />
      </Section>

      {/* 2. Use type groups to create hierarchy */}
      <Section title="Use type groups to create hierarchy">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Each type group has a clear role. Use larger Display and Heading
          styles for primary hierarchy, then Label and Body styles to support
          structure and context.
        </p>
        <DoAndDont
          doLabel="Use Heading styles for page structure and Body styles for supporting content."
          dontLabel="Don't use Display styles in transactional flows."
        />
      </Section>

      {/* 3. Keep UI text functional and scannable */}
      <Section title="Keep UI text functional and scannable">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          UI text should be compact and easy to read. Label styles are built for
          buttons and form labels, while Body styles support helper or
          descriptive text. Using oversized or expressive styles for controls
          disrupts clarity and slows down users.
        </p>
        <DoAndDont
          doLabel="Use Label styles for controls and Body styles for supporting information."
          dontLabel="Don't use Heading or Display styles for UI controls."
        />
      </Section>

      {/* 4. Use emphasis sparingly */}
      <Section title="Use emphasis sparingly">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Emphasis should be minimal. A single bold phrase is usually enough to
          guide the user's attention. Stacking multiple emphasis treatments
          makes text harder to read and visually overwhelming.
        </p>
        <DoAndDont
          doLabel="Use bold sparingly to highlight key points within text."
          dontLabel="Don't stack multiple emphasis treatments in the same phrase."
        />
      </Section>

      {/* 5. Respect responsive behavior */}
      <Section title="Respect responsive behavior">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Display and Heading styles include built-in responsive sizes for web,
          tablet, and mobile. Designers should rely on these instead of resizing
          text manually. Label and Body styles stay fixed to maintain stability
          in UI layouts.
        </p>
        <Note>
          Responsive scaling is handled by the token layer. Always apply a
          semantic text style token rather than setting a manual font size.
          Overriding sizes directly breaks the responsive contract and creates
          drift between design and production.
        </Note>
      </Section>

      {/* 6. Plan for localization and accessibility */}
      <Section title="Plan for localization and accessibility">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Typography needs to adapt to different languages and scripts. Disney+
          includes localized Inspire variants, and all designs should allow
          space for longer translations. Flexible layouts and accessible text
          sizes help the system remain durable across regions.
        </p>
        <Note>
          Text in German, French, and many other languages can run 20-40% longer
          than English. Design layouts with overflow in mind and avoid fixed
          text containers. For right-to-left scripts like Arabic and Hebrew,
          rely on the system&apos;s bidi-aware font variants rather than
          manually flipping layout.
        </Note>
      </Section>

      {/* 7. RTL support */}
      <Section title="Right-to-left (RTL) support">
        <p className="max-w-prose text-sm text-surface-foreground-muted">
          Two of Pascal&apos;s supported scripts — Arabic and Hebrew — read
          right-to-left. Layouts using Inspire Arabic or Inspire Hebrew must
          mirror the UI direction using the HTML{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
            dir=&apos;rtl&apos;
          </code>{" "}
          attribute. Pascal&apos;s token system is direction-agnostic — spacing,
          alignment, and layout tokens apply correctly in both LTR and RTL
          contexts when the direction attribute is set at the root level.
        </p>
        <div
          style={{
            backgroundColor: "var(--color-semantic-info-background)",
            border: "1px solid var(--color-semantic-info-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-5) var(--spacing-6)",
            display: "flex",
            gap: "var(--spacing-4)",
            alignItems: "flex-start",
          }}
        >
          {/* Info icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
            style={{ flexShrink: 0, marginTop: 1 }}
          >
            <circle
              cx="9"
              cy="9"
              r="8"
              stroke="var(--color-semantic-info-foreground)"
              strokeWidth="1.5"
            />
            <path
              d="M9 8v5M9 6.5v.5"
              stroke="var(--color-semantic-info-foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <p
              style={{
                margin: "0 0 var(--spacing-2) 0",
                fontSize: "var(--font-size-sm)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--color-semantic-info-foreground)",
              }}
            >
              RTL implementation
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-sm)",
                color: "var(--color-semantic-info-foreground)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              Set{" "}
              <code
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--font-size-xs)",
                  backgroundColor: "rgba(0,0,0,0.06)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1px 5px",
                }}
              >
                dir=&quot;rtl&quot;
              </code>{" "}
              on the{" "}
              <code
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--font-size-xs)",
                  backgroundColor: "rgba(0,0,0,0.06)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1px 5px",
                }}
              >
                &lt;html&gt;
              </code>{" "}
              element when serving an RTL locale. Do not use CSS transforms or
              manual margin overrides to simulate RTL — the browser handles
              mirroring automatically when the direction attribute is correct.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
