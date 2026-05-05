// ── Types & data ───────────────────────────────────────────────────────────

type BrandBadgeVariant = "disney" | "hulu" | "espn";

interface TypefaceEntry {
  name: string;
  brands: BrandBadgeVariant[];
  description: string;
  specimen: string;
}

const TYPEFACES: TypefaceEntry[] = [
  {
    name: "Inspire",
    brands: ["disney"],
    description:
      "Inspire is an in-house typeface created specifically for Disney+. It blends warmth, clarity, and a cinematic tone across all type groups, from Display down to Body. Inspire includes localized variants for Arabic, Hebrew, Japanese, Korean, Traditional Chinese, Simplified Chinese, and Thai, ensuring a unified Disney+ voice worldwide.",
    specimen:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 !@#$%^&*()_+",
  },
  {
    name: "Graphik",
    brands: ["hulu"],
    description:
      "Graphik is Hulu's primary typeface, chosen for its clean geometry and versatility. It maintains strong readability at small sizes and a confident, contemporary tone at larger scales. All text styles use Graphik to reinforce Hulu's minimal, straightforward visual language.",
    specimen:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 !@#$%^&*()_+",
  },
  {
    name: "ESPN Ignite",
    brands: ["espn"],
    description:
      "ESPN Ignite is the core typeface family for ESPN mode. It includes a Display cut for expressive, high-impact moments and a Text Condensed cut optimized for headlines and dense layouts. Both styles share the same energetic, competitive personality. BentonSans supports the system for Labels and Body text where clarity and readability are essential.",
    specimen:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 !@#$%^&*()_+",
  },
  {
    name: "BentonSans",
    brands: ["espn"],
    description:
      "BentonSans is used for Label and Body styles in ESPN mode. It provides a stable, highly legible counterbalance to the expressive Ignite typefaces. Labels, forms, and supporting text rely on BentonSans to remain clean and readable across all commerce flows.",
    specimen:
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 !@#$%^&*()_+",
  },
];

// ── Brand badge ─────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<
  BrandBadgeVariant,
  { background: string; color: string; label: string }
> = {
  disney: {
    background: "var(--color-semantic-info-background)",
    color: "var(--color-semantic-info-foreground)",
    label: "Disney+",
  },
  hulu: {
    background: "var(--color-semantic-success-background)",
    color: "var(--color-semantic-success-foreground)",
    label: "Hulu",
  },
  espn: {
    background: "var(--color-semantic-error-background)",
    color: "var(--color-semantic-error-foreground)",
    label: "ESPN",
  },
};

function BrandBadge({ variant }: { variant: BrandBadgeVariant }) {
  const style = BADGE_STYLES[variant];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: style.background,
        color: style.color,
        borderRadius: "var(--radius-full)",
        padding: "2px 10px",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "var(--line-height-loose)",
      }}
    >
      {style.label}
    </span>
  );
}

// ── Typeface section (Fix 1: plain content, no card wrapper) ────────────────

function TypefaceSection({ entry }: { entry: TypefaceEntry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
      {/* Name + badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-3)",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-surface-foreground)",
            margin: 0,
          }}
        >
          {entry.name}
        </h2>
        <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
          {entry.brands.map((b) => (
            <BrandBadge key={b} variant={b} />
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-surface-foreground-muted)",
          lineHeight: "var(--line-height-relaxed)",
          margin: 0,
          maxWidth: "72ch",
        }}
      >
        {entry.description}
      </p>

      {/* Specimen */}
      <p
        style={{
          fontFamily: "var(--font-family-base, var(--font-family-sans))",
          fontSize: "1.375rem",
          lineHeight: "var(--line-height-relaxed)",
          color: "var(--color-surface-foreground)",
          margin: 0,
          wordBreak: "break-word",
        }}
      >
        {entry.specimen}
      </p>
      <p
        style={{
          fontSize: "var(--font-size-xs)",
          color: "var(--color-surface-foreground-muted)",
          margin: 0,
        }}
      >
        Live specimen requires the licensed font to be installed. Shown here
        using the current base font as a fallback.
      </p>
    </div>
  );
}

// ── Inspire localized variants ──────────────────────────────────────────────

// Fix 2: removed `script` field
interface LocalizedVariant {
  name: string;
  languages: string;
  notes: string;
}

// Fix 3: updated variant names, added Inspire THL
const INSPIRE_VARIANTS: LocalizedVariant[] = [
  {
    name: "Inspire AR",
    languages: "Arabic",
    notes: "Right-to-left. Supports full Arabic character set including diacritics.",
  },
  {
    name: "Inspire HE",
    languages: "Hebrew",
    notes: "Right-to-left. Optimized for Hebrew letterforms and vowel marks.",
  },
  {
    name: "Inspire JP FF",
    languages: "Japanese",
    notes: "Supports hiragana, katakana, and kanji.",
  },
  {
    name: "Inspire KR",
    languages: "Korean",
    notes: "Supports full Hangul syllabary.",
  },
  {
    name: "Inspire SC",
    languages: "Simplified Chinese",
    notes: "Used in mainland China. Supports GB18030 character set.",
  },
  {
    name: "Inspire TC",
    languages: "Traditional Chinese",
    notes: "Used in Taiwan, Hong Kong, and Macau. Supports Big5 character set.",
  },
  {
    name: "Inspire TH",
    languages: "Thai",
    notes: "Supports full Thai alphabet including tone marks.",
  },
  {
    name: "Inspire THL",
    languages: "Thai Looped",
    notes: "Looped variant of the Thai script, used in formal and educational contexts.",
  },
];

function InspireLocalizedVariants() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface-elevated)",
        border: "1px solid var(--color-surface-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "var(--spacing-5) var(--spacing-6)",
          borderBottom: "1px solid var(--color-surface-border)",
          backgroundColor: "var(--color-surface-canvas)",
        }}
      >
        <h3
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-surface-foreground)",
            margin: "0 0 var(--spacing-2) 0",
          }}
        >
          Localized variants
        </h3>
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-surface-foreground-muted)",
            lineHeight: "var(--line-height-relaxed)",
            margin: 0,
            maxWidth: "72ch",
          }}
        >
          Inspire includes dedicated localized variants to ensure Disney+
          maintains a unified voice across global markets. Each variant is
          optimized for its script&apos;s unique typographic requirements while
          preserving the warmth and cinematic tone of the core Inspire family.
        </p>
      </div>

      {/* Variants table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-brand-primary">
              <th className="px-4 py-3 text-left text-xs font-semibold text-surface-elevated">
                Variant
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-surface-elevated">
                Languages supported
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-surface-elevated">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {INSPIRE_VARIANTS.map((variant) => (
              <tr key={variant.name} className="bg-surface-elevated">
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-surface-foreground">
                  {variant.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-surface-foreground-muted">
                  {variant.languages}
                </td>
                <td className="px-4 py-3 text-surface-foreground-muted">
                  {variant.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div
        style={{
          padding: "var(--spacing-4) var(--spacing-5)",
          borderTop: "1px solid var(--color-surface-border)",
          backgroundColor: "var(--color-surface-canvas)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-surface-foreground-muted)",
            margin: 0,
            lineHeight: "var(--line-height-relaxed)",
          }}
        >
          RTL scripts (Arabic, Hebrew) require additional layout considerations.
          See the Apply type tab for guidance on directionality and RTL support.
        </p>
      </div>
    </div>
  );
}

// ── Divider ─────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--color-surface-border)",
        margin: "var(--spacing-2) 0",
      }}
    />
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

const [inspire, graphik, espnIgnite, bentonSans] = TYPEFACES;

export default function TypographyFontsPage() {
  return (
    <div className="space-y-8">
      <p className="max-w-prose text-surface-foreground-muted">
        Each brand uses a dedicated font family that reflects its personality.
        Switching brand modes automatically applies the correct fonts, weights,
        and responsive sizes through semantic tokens.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
        {/* Inspire + localized variants */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)" }}>
          <TypefaceSection entry={inspire} />
          <InspireLocalizedVariants />
        </div>

        <Divider />

        {/* Graphik */}
        <TypefaceSection entry={graphik} />

        <Divider />

        {/* ESPN group — no divider between ESPN Ignite and BentonSans */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          <TypefaceSection entry={espnIgnite} />

          <TypefaceSection entry={bentonSans} />
        </div>
      </div>
    </div>
  );
}
