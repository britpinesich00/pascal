"use client";

import { useState } from "react";
import { hexToHsl, getContrastColor } from "@/utils/colorUtils";
import disneyTokens from "@/tokens/colors/disney-primitives.json";
import huluTokens from "@/tokens/colors/hulu-primitives.json";

// ── Figma token shape ──────────────────────────────────────────────────────

interface FigmaTokenValue {
  colorSpace: string;
  components: number[];
  alpha: number;
  hex: string;
}

interface FigmaToken {
  $type: "color";
  $value: FigmaTokenValue;
  $extensions?: Record<string, unknown>;
}

// ── Parsed palette types ───────────────────────────────────────────────────

interface Swatch {
  name: string;
  hex: string;
}

interface ColorScale {
  name: string;
  swatches: Swatch[];
}

// ── Token parser ───────────────────────────────────────────────────────────

function extractHex(step: unknown): string | null {
  const s = step as Record<string, unknown>;

  // Simple entry: the token is directly at this level
  if (s.$type === "color") {
    return (s.$value as FigmaTokenValue).hex;
  }

  // Entry with opacity variants: the solid base is nested under $root
  if (s.$root) {
    const root = s.$root as Record<string, unknown>;
    if (root.$type === "color") {
      return (root.$value as FigmaTokenValue).hex;
    }
  }

  return null;
}

function parseTokens(tokens: Record<string, unknown>): ColorScale[] {
  const scales: ColorScale[] = [];

  for (const [scaleName, scaleData] of Object.entries(tokens)) {
    if (scaleName === "$extensions" || scaleName === "_note") continue;
    if (typeof scaleData !== "object" || scaleData === null) continue;

    const swatches: Swatch[] = [];

    for (const [stepKey, stepData] of Object.entries(
      scaleData as Record<string, unknown>,
    )) {
      const hex = extractHex(stepData);
      if (hex) {
        swatches.push({ name: stepKey, hex });
      }
    }

    // Sort by the numeric suffix (e.g., "neutral-96" → 96)
    swatches.sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, "") || "0", 10);
      const numB = parseInt(b.name.replace(/\D/g, "") || "0", 10);
      return numA - numB;
    });

    if (swatches.length > 0) {
      scales.push({ name: scaleName, swatches });
    }
  }

  return scales;
}

const DISNEY_SCALES = parseTokens(disneyTokens as Record<string, unknown>);
const HULU_SCALES = parseTokens(huluTokens as Record<string, unknown>);

// ── Swatch component ───────────────────────────────────────────────────────

function ColorSwatch({ swatch }: { swatch: Swatch }) {
  const hsl = hexToHsl(swatch.hex);
  const textColor = getContrastColor(swatch.hex);

  return (
    <div
      className="flex items-center gap-4 rounded-lg px-4 py-3"
      style={{ backgroundColor: swatch.hex }}
    >
      <p className="flex-1 text-sm font-semibold" style={{ color: textColor }}>
        {swatch.name}
      </p>
      <div className="text-right" style={{ color: textColor }}>
        <p className="font-mono text-xs opacity-90">
          {swatch.hex.toUpperCase()}
        </p>
        <p className="font-mono text-xs opacity-70">
          {hsl}
        </p>
      </div>
    </div>
  );
}

// ── Scale row component ────────────────────────────────────────────────────

function ScaleRow({ scale }: { scale: ColorScale }) {
  const label = scale.name.charAt(0).toUpperCase() + scale.name.slice(1);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-surface-foreground">{label}</h3>
      <div className="flex flex-col gap-1">
        {scale.swatches.map((swatch) => (
          <ColorSwatch key={swatch.name} swatch={swatch} />
        ))}
      </div>
    </div>
  );
}

// ── ESPN placeholder ───────────────────────────────────────────────────────

function EspnPlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-surface-border-strong bg-surface-subtle px-8 py-20 text-center">
      <div className="mx-auto max-w-sm space-y-3">
        <h3 className="text-xl font-semibold text-surface-foreground">
          ESPN primitives coming soon
        </h3>
        <p className="text-surface-foreground-muted">
          The ESPN color palette is currently in progress. The full primitive
          scale will appear here once the brand tokens have been finalized.
        </p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

type BrandKey = "disney" | "hulu" | "espn";

const BRAND_OPTIONS: { value: BrandKey; label: string }[] = [
  { value: "disney", label: "Disney+" },
  { value: "hulu", label: "Hulu" },
  { value: "espn", label: "ESPN" },
];

const BRAND_SCALES: Record<Exclude<BrandKey, "espn">, ColorScale[]> = {
  disney: DISNEY_SCALES,
  hulu: HULU_SCALES,
};

export default function ColorPrimitivesPage() {
  const [brand, setBrand] = useState<BrandKey>("disney");

  return (
    <div className="space-y-8">
      <p className="max-w-prose text-surface-foreground-muted">
        The raw color scales for Disney+, Hulu, and ESPN. Primitive tokens form
        the foundation of the Pascal palette — they are not applied directly in
        UI, but are mapped to semantic tokens that carry contextual meaning.
      </p>

      {/* Color scheme dropdown */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="color-scheme"
          className="text-xs font-semibold text-surface-foreground-muted"
        >
          Color scheme
        </label>
        <div className="relative w-48">
          <select
            id="color-scheme"
            value={brand}
            onChange={(e) => setBrand(e.target.value as BrandKey)}
            className="w-full appearance-none rounded-lg border border-surface-border bg-surface-elevated py-2 pl-3 pr-8 text-sm text-surface-foreground transition-colors hover:border-surface-border-strong focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary-muted"
          >
            {BRAND_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-surface-foreground-muted"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
          </svg>
        </div>

        {/* ESPN notice */}
        {brand === "espn" && (
          <p className="mt-1 text-sm text-surface-foreground-muted">
            <span className="font-semibold text-surface-foreground">
              ESPN primitives are pending
            </span>{" "}
            — the full palette will appear here once brand tokens are finalized.
          </p>
        )}
      </div>

      {/* Content */}
      {brand === "espn" ? (
        <EspnPlaceholder />
      ) : (
        <div className="space-y-12">
          {BRAND_SCALES[brand].map((scale) => (
            <ScaleRow key={scale.name} scale={scale} />
          ))}
        </div>
      )}
    </div>
  );
}
