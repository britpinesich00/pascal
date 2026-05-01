"use client";

import { useState } from "react";
import { hexToHsl } from "@/utils/colorUtils";
import semanticTokens from "@/tokens/colors/semantic-colors.json";
import { ColorCard } from "@/components/ui/ColorCard";

// ── Types ──────────────────────────────────────────────────────────────────

type BrandKey = "disney" | "hulu" | "espn";

interface ResolvedValue {
  primitive: string | null;
  hex: string;
}

type TokenBrandValue = ResolvedValue | "PENDING";

interface SemanticToken {
  name: string;
  disney: TokenBrandValue;
  hulu: TokenBrandValue;
  espn: TokenBrandValue;
}

interface AccordionSection {
  id: string;
  label: string;
  tokens: SemanticToken[];
}

// ── JSON parsing helpers ───────────────────────────────────────────────────

function isTokenEntry(
  v: unknown,
): v is { disney: TokenBrandValue; hulu: TokenBrandValue; espn: TokenBrandValue } {
  return (
    typeof v === "object" &&
    v !== null &&
    ("disney" in v || "hulu" in v || "espn" in v)
  );
}

function tokensFromObject(data: Record<string, unknown>): SemanticToken[] {
  const result: SemanticToken[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (key === "_note") continue;
    if (isTokenEntry(value)) {
      result.push({
        name: key,
        disney: value.disney as TokenBrandValue,
        hulu: value.hulu as TokenBrandValue,
        espn: value.espn as TokenBrandValue,
      });
    }
  }
  return result;
}

function pickTokens(
  data: Record<string, unknown>,
  names: string[],
): SemanticToken[] {
  const nameSet = new Set(names);
  return tokensFromObject(data).filter((t) => nameSet.has(t.name));
}

// ── Build accordion sections from semantic token JSON ─────────────────────

const json = semanticTokens as Record<string, unknown>;
const surface = json.surface as Record<string, unknown>;

const MATERIAL_SECTIONS: AccordionSection[] = [
  {
    id: "primary",
    label: "Primary",
    tokens: tokensFromObject(json.brand as Record<string, unknown>),
  },
  {
    id: "secondary",
    label: "Secondary",
    tokens: tokensFromObject(json.secondary as Record<string, unknown>),
  },
  {
    id: "tertiary",
    label: "Tertiary",
    tokens: tokensFromObject(json.tertiary as Record<string, unknown>),
  },
  {
    id: "error",
    label: "Error",
    tokens: tokensFromObject(json.error as Record<string, unknown>),
  },
  {
    id: "warning",
    label: "Warning",
    tokens: tokensFromObject(json.warning as Record<string, unknown>),
  },
  {
    id: "success",
    label: "Success",
    tokens: tokensFromObject(json.success as Record<string, unknown>),
  },
  {
    id: "info",
    label: "Info",
    tokens: tokensFromObject(json.info as Record<string, unknown>),
  },
  {
    id: "surface",
    label: "Surface",
    tokens: pickTokens(surface, [
      "surface",
      "surface-variant",
      "on-surface",
      "on-surface-variant",
      "action",
      "surface-gradient-start",
      "surface-gradient-end",
    ]),
  },
  {
    id: "background",
    label: "Background",
    tokens: pickTokens(surface, [
      "surface-container-lowest",
      "surface-container-low",
      "surface-container",
      "surface-container-high",
      "surface-container-highest",
    ]),
  },
  {
    id: "outline",
    label: "Outline",
    tokens: pickTokens(surface, ["outline", "outline-variant"]),
  },
  {
    id: "inverse",
    label: "Inverse",
    tokens: tokensFromObject(json.inverse as Record<string, unknown>),
  },
  {
    id: "scrim-shadow",
    label: "Scrim & Shadow",
    tokens: pickTokens(surface, [
      "scrim",
      "shadow-shadow-key",
      "shadow-shadow-amb",
      "shadow-shadow-outline",
    ]),
  },
];

// ── Accordion item ─────────────────────────────────────────────────────────

function AccordionItem({
  section,
  isOpen,
  onToggle,
  brand,
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  brand: BrandKey;
}) {
  return (
    <div className="border-b border-surface-border last:border-b-0">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary-muted"
      >
        <span className="flex-1 text-sm font-semibold text-surface-foreground">
          {section.label}
        </span>
        {/* Chevron */}
        <svg
          className={`h-4 w-4 flex-none text-surface-foreground-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.tokens.map((token) => {
            const value = token[brand];
            const isPending = value === "PENDING";
            return (
              <ColorCard
                key={token.name}
                tokenName={token.name}
                primitiveRef={isPending ? null : (value.primitive ?? null)}
                hex={isPending ? null : value.hex}
                hsl={isPending ? null : hexToHsl(value.hex)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

const BRAND_OPTIONS: { value: BrandKey; label: string }[] = [
  { value: "disney", label: "Disney+" },
  { value: "hulu", label: "Hulu" },
  { value: "espn", label: "ESPN" },
];

export default function SemanticColorsPage() {
  const [brand, setBrand] = useState<BrandKey>("disney");
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["primary"]),
  );

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <p className="max-w-prose text-surface-foreground-muted">
        Semantic tokens give color decisions meaningful names — like{" "}
        <code className="rounded bg-surface-subtle px-1 py-0.5 font-mono text-sm">
          surface
        </code>{" "}
        or{" "}
        <code className="rounded bg-surface-subtle px-1 py-0.5 font-mono text-sm">
          on-brand
        </code>{" "}
        — that remain stable across brands. Each name resolves to a different
        primitive value depending on the active brand.
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
            — some tokens will show as unresolved until the ESPN palette is
            finalized.
          </p>
        )}
      </div>

      {/* Material.io accordion */}
      <div className="overflow-hidden rounded-xl border border-surface-border">
        {MATERIAL_SECTIONS.map((section) => (
          <AccordionItem
            key={section.id}
            section={section}
            isOpen={openSections.has(section.id)}
            onToggle={() => toggleSection(section.id)}
            brand={brand}
          />
        ))}
      </div>
    </div>
  );
}
