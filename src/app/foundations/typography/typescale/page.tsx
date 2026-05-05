"use client";

import { useState } from "react";
import { Accordion, FolderClosedIcon, FolderOpenIcon } from "@/components/ui/Accordion";

// ---------------------------------------------------------------------------
// Brand switcher
// ---------------------------------------------------------------------------
type BrandKey = "disney" | "hulu" | "espn";

const BRAND_OPTIONS: { value: BrandKey; label: string }[] = [
  { value: "disney", label: "Disney+" },
  { value: "hulu", label: "Hulu" },
  { value: "espn", label: "ESPN" },
];

// ---------------------------------------------------------------------------
// Data shape
// ---------------------------------------------------------------------------
interface StyleData {
  fontName: string;
  fontWeight: string;
  fontSize: string;
  tracking: string;
  lineHeight: string;
}

type SizeKey = "large" | "medium" | "small" | "xsmall";
type RoleKey = "display" | "headline" | "label" | "body";

type TypescaleData = {
  [B in BrandKey]: {
    [R in RoleKey]: {
      [S in SizeKey]: StyleData;
    };
  };
};

// ---------------------------------------------------------------------------
// Typescale data — values sourced from Figma token exports
// ---------------------------------------------------------------------------
const typescaleData: TypescaleData = {
  disney: {
    display: {
      large:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "72px", tracking: "−0.32px", lineHeight: "80px" },
      medium: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "52px", tracking: "−0.32px", lineHeight: "64px" },
      small:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "44px", tracking: "−0.16px", lineHeight: "52px" },
      xsmall: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "36px", tracking: "0",       lineHeight: "44px" },
    },
    headline: {
      large:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "28px", tracking: "0",       lineHeight: "36px" },
      medium: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "24px", tracking: "0",       lineHeight: "32px" },
      small:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "20px", tracking: "0",       lineHeight: "24px" },
      xsmall: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "16px", tracking: "0",       lineHeight: "24px" },
    },
    label: {
      large:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "18px", tracking: "+0.16px", lineHeight: "24px" },
      medium: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "16px", tracking: "+0.16px", lineHeight: "24px" },
      small:  { fontName: "Inspire", fontWeight: "Bold",    fontSize: "14px", tracking: "+0.16px", lineHeight: "16px" },
      xsmall: { fontName: "Inspire", fontWeight: "Bold",    fontSize: "12px", tracking: "+0.16px", lineHeight: "16px" },
    },
    body: {
      large:  { fontName: "Inspire", fontWeight: "Regular", fontSize: "18px", tracking: "0",       lineHeight: "28px" },
      medium: { fontName: "Inspire", fontWeight: "Regular", fontSize: "16px", tracking: "0",       lineHeight: "24px" },
      small:  { fontName: "Inspire", fontWeight: "Regular", fontSize: "14px", tracking: "0",       lineHeight: "20px" },
      xsmall: { fontName: "Inspire", fontWeight: "Regular", fontSize: "12px", tracking: "0",       lineHeight: "16px" },
    },
  },

  hulu: {
    display: {
      large:  { fontName: "Graphik", fontWeight: "Medium",   fontSize: "72px", tracking: "−0.32px", lineHeight: "80px" },
      medium: { fontName: "Graphik", fontWeight: "Medium",   fontSize: "52px", tracking: "−0.32px", lineHeight: "64px" },
      small:  { fontName: "Graphik", fontWeight: "Medium",   fontSize: "44px", tracking: "−0.16px", lineHeight: "52px" },
      xsmall: { fontName: "Graphik", fontWeight: "Medium",   fontSize: "36px", tracking: "0",       lineHeight: "44px" },
    },
    headline: {
      large:  { fontName: "Graphik", fontWeight: "Semibold", fontSize: "28px", tracking: "0",       lineHeight: "36px" },
      medium: { fontName: "Graphik", fontWeight: "Semibold", fontSize: "24px", tracking: "0",       lineHeight: "32px" },
      small:  { fontName: "Graphik", fontWeight: "Semibold", fontSize: "20px", tracking: "0",       lineHeight: "24px" },
      xsmall: { fontName: "Graphik", fontWeight: "Semibold", fontSize: "16px", tracking: "0",       lineHeight: "24px" },
    },
    label: {
      large:  { fontName: "Graphik", fontWeight: "Medium",   fontSize: "18px", tracking: "+0.16px", lineHeight: "24px" },
      medium: { fontName: "Graphik", fontWeight: "Medium",   fontSize: "16px", tracking: "+0.16px", lineHeight: "24px" },
      small:  { fontName: "Graphik", fontWeight: "Medium",   fontSize: "14px", tracking: "+0.16px", lineHeight: "16px" },
      xsmall: { fontName: "Graphik", fontWeight: "Medium",   fontSize: "12px", tracking: "+0.16px", lineHeight: "16px" },
    },
    body: {
      large:  { fontName: "Graphik", fontWeight: "Regular",  fontSize: "18px", tracking: "0",       lineHeight: "28px" },
      medium: { fontName: "Graphik", fontWeight: "Regular",  fontSize: "16px", tracking: "0",       lineHeight: "24px" },
      small:  { fontName: "Graphik", fontWeight: "Regular",  fontSize: "14px", tracking: "0",       lineHeight: "20px" },
      xsmall: { fontName: "Graphik", fontWeight: "Regular",  fontSize: "12px", tracking: "0",       lineHeight: "16px" },
    },
  },

  espn: {
    display: {
      large:  { fontName: "ESPN Ignite Display", fontWeight: "Cond Heavy", fontSize: "56px", tracking: "+0.4px", lineHeight: "68px" },
      medium: { fontName: "ESPN Ignite Display", fontWeight: "Cond Heavy", fontSize: "56px", tracking: "+0.4px", lineHeight: "68px" },
      small:  { fontName: "ESPN Ignite Display", fontWeight: "Cond Heavy", fontSize: "40px", tracking: "+0.4px", lineHeight: "48px" },
      xsmall: { fontName: "ESPN Ignite Display", fontWeight: "Cond Heavy", fontSize: "40px", tracking: "+0.4px", lineHeight: "48px" },
    },
    headline: {
      large:  { fontName: "ESPN Ignite Text", fontWeight: "Bold", fontSize: "20px", tracking: "+0.2px", lineHeight: "24px" },
      medium: { fontName: "ESPN Ignite Text", fontWeight: "Bold", fontSize: "20px", tracking: "+0.4px", lineHeight: "24px" },
      small:  { fontName: "ESPN Ignite Text", fontWeight: "Bold", fontSize: "14px", tracking: "+0.4px", lineHeight: "20px" },
      xsmall: { fontName: "ESPN Ignite Text", fontWeight: "Bold", fontSize: "14px", tracking: "+0.4px", lineHeight: "20px" },
    },
    label: {
      large:  { fontName: "BentonSans", fontWeight: "Bold", fontSize: "18px", tracking: "0", lineHeight: "24px" },
      medium: { fontName: "BentonSans", fontWeight: "Bold", fontSize: "16px", tracking: "0", lineHeight: "24px" },
      small:  { fontName: "BentonSans", fontWeight: "Bold", fontSize: "14px", tracking: "0", lineHeight: "16px" },
      xsmall: { fontName: "BentonSans", fontWeight: "Bold", fontSize: "12px", tracking: "0", lineHeight: "16px" },
    },
    body: {
      large:  { fontName: "BentonSans", fontWeight: "Regular", fontSize: "18px", tracking: "0", lineHeight: "28px" },
      medium: { fontName: "BentonSans", fontWeight: "Regular", fontSize: "16px", tracking: "0", lineHeight: "24px" },
      small:  { fontName: "BentonSans", fontWeight: "Regular", fontSize: "14px", tracking: "0", lineHeight: "20px" },
      xsmall: { fontName: "BentonSans", fontWeight: "Regular", fontSize: "12px", tracking: "0", lineHeight: "16px" },
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const WEIGHT_MAP: Record<string, string> = {
  Bold: "700",
  Semibold: "600",
  Medium: "500",
  Regular: "400",
  "Cond Heavy": "700",
};

function toWeightNum(w: string): string {
  return WEIGHT_MAP[w] ?? "400";
}

const SIZE_LABELS: Record<SizeKey, string> = {
  large: "Large",
  medium: "Medium",
  small: "Small",
  xsmall: "X Small",
};

const ROLE_LABELS: Record<RoleKey, string> = {
  display: "Display",
  headline: "Headline",
  label: "Label",
  body: "Body",
};

// ---------------------------------------------------------------------------
// Chevron (local, not exported from Accordion)
// ---------------------------------------------------------------------------
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        transition: "transform 200ms ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Cards (Fix 1: equal 3-col grid, Fix 3: lg value text)
// ---------------------------------------------------------------------------
const cardBase: React.CSSProperties = {
  background: "var(--color-surface-elevated)",
  border: "1px solid var(--color-surface-border)",
  borderRadius: "var(--radius-lg)",
  padding: "var(--spacing-5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "120px",
  // Prevent the card from growing beyond its grid column
  minWidth: 0,
  overflow: "hidden",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "var(--font-family-base)",
  fontSize: "var(--font-size-base)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-surface-foreground)",
  lineHeight: 1.2,
  wordBreak: "break-word",
};

function CardLabel({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: "var(--font-size-sm)",
        color: "var(--color-surface-foreground-muted)",
        fontWeight: "var(--font-weight-regular)",
      }}
    >
      {text}
    </span>
  );
}

// Convert display tracking strings (e.g. "−0.32px", "+0.16px", "0") to valid CSS
function trackingToCSS(tracking: string): string {
  return tracking.replace("−", "-").replace("+", "");
}

interface StyleCardsProps {
  role: RoleKey;
  size: SizeKey;
  data: StyleData;
}

function StyleCards({ role, size, data }: StyleCardsProps) {
  const roleName = ROLE_LABELS[role];
  const sizeName = SIZE_LABELS[size];
  const styleLabel = `${roleName} ${sizeName}`;
  const previewWeight = toWeightNum(data.fontWeight);

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "var(--spacing-3)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
      {/* Row 1: Specimen | Font name | Font weight */}
      <div style={gridStyle}>
        {/* Fix 2: all five type properties applied to the specimen */}
        <div style={{ ...cardBase, background: "var(--color-surface-subtle)" }}>
          <span
            style={{
              fontFamily: "var(--font-family-base)",
              fontSize: data.fontSize,
              fontWeight: previewWeight,
              lineHeight: data.lineHeight,
              letterSpacing: trackingToCSS(data.tracking),
              color: "var(--color-surface-foreground)",
              display: "block",
              overflow: "hidden",
            }}
          >
            Aa
          </span>
          <span
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-surface-foreground-muted)",
              marginTop: "var(--spacing-3)",
              display: "block",
            }}
          >
            {styleLabel}
          </span>
        </div>

        {/* Fix 3: no TokenChip — CardLabel text only */}
        <div style={cardBase}>
          <span style={valueStyle}>{data.fontName}</span>
          <CardLabel text={`${styleLabel} font name`} />
        </div>

        <div style={cardBase}>
          <span style={valueStyle}>{data.fontWeight}</span>
          <CardLabel text={`${styleLabel} font weight`} />
        </div>
      </div>

      {/* Row 2: Font size | Tracking | Line height */}
      <div style={gridStyle}>
        <div style={cardBase}>
          <span style={valueStyle}>{data.fontSize}</span>
          <CardLabel text={`${styleLabel} font size`} />
        </div>

        <div style={cardBase}>
          <span style={valueStyle}>{data.tracking}</span>
          <CardLabel text={`${styleLabel} tracking`} />
        </div>

        <div style={cardBase}>
          <span style={valueStyle}>{data.lineHeight}</span>
          <CardLabel text={`${styleLabel} line height`} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fix 2: SizeRow — indented inline row, not a nested boxed accordion
// ---------------------------------------------------------------------------
interface SizeRowProps {
  role: RoleKey;
  size: SizeKey;
  brand: BrandKey;
  isFirst?: boolean;
}

function SizeRow({ role, size, brand, isFirst = false }: SizeRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const roleName = ROLE_LABELS[role];
  const sizeName = SIZE_LABELS[size];
  const data = typescaleData[brand][role][size];

  return (
    <div
      style={{
        borderTop: isFirst ? "none" : "1px solid var(--color-surface-border)",
      }}
    >
      {/* Row trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          paddingLeft: "var(--spacing-6)",
          paddingRight: "var(--spacing-5)",
          paddingTop: "var(--spacing-3)",
          paddingBottom: "var(--spacing-3)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--color-surface-foreground)",
        }}
      >
        <span style={{ color: "var(--color-surface-foreground-muted)", flexShrink: 0 }}>
          {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}
        </span>
        <span
          style={{
            flex: 1,
            fontSize: "var(--font-size-sm)",
            color: "var(--color-surface-foreground)",
          }}
        >
          <span style={{ color: "var(--color-surface-foreground-muted)" }}>
            {roleName} styles
          </span>
          {" / "}
          {roleName} {sizeName}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Animated card area */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 200ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "var(--spacing-4) var(--spacing-5) var(--spacing-5)",
            }}
          >
            <StyleCards role={role} size={size} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Role accordion (Display, Headline, Label, Body)
// ---------------------------------------------------------------------------
const SIZES: SizeKey[] = ["large", "medium", "small", "xsmall"];

interface RoleAccordionProps {
  role: RoleKey;
  brand: BrandKey;
  defaultOpen?: boolean;
}

function RoleAccordion({ role, brand, defaultOpen = false }: RoleAccordionProps) {
  const label = `${ROLE_LABELS[role]} styles`;

  return (
    <Accordion label={label} defaultOpen={defaultOpen} noPadding>
      {SIZES.map((size, i) => (
        <SizeRow key={size} role={role} size={size} brand={brand} isFirst={i === 0} />
      ))}
    </Accordion>
  );
}

// ---------------------------------------------------------------------------
// Brand dropdown (matches the tokens page pattern)
// ---------------------------------------------------------------------------
function BrandDropdown({
  value,
  onChange,
}: {
  value: BrandKey;
  onChange: (v: BrandKey) => void;
}) {
  return (
    <div className="relative w-48">
      <select
        id="brand-select"
        value={value}
        onChange={(e) => onChange(e.target.value as BrandKey)}
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
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const ROLES: RoleKey[] = ["display", "headline", "label", "body"];

export default function TypescalePage() {
  const [brand, setBrand] = useState<BrandKey>("disney");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
      {/* Brand switcher */}
      <BrandDropdown value={brand} onChange={setBrand} />

      {/* Accordion list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {ROLES.map((role, i) => (
          <RoleAccordion
            key={role}
            role={role}
            brand={brand}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
