import type { Config } from "tailwindcss";
import tokens from "./src/tokens/tokens.json";

function flattenColorVars(
  obj: Record<string, unknown>,
  prefix: string[] = [],
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(
        result,
        flattenColorVars(value as Record<string, unknown>, path),
      );
    } else {
      const cssPath = path.join("-");
      result[path.join("-")] = `var(--color-${cssPath})`;
    }
  }
  return result;
}

function mapSpacingVars(scale: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.keys(scale).map((key) => [
      key,
      `var(--spacing-${key.replace(/\./g, "-")})`,
    ]),
  );
}

function mapRadiusVars(scale: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.keys(scale).map((key) => [key, `var(--radius-${key})`]),
  );
}

function mapShadowVars(scale: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.keys(scale).map((key) => [key, `var(--shadow-${key})`]),
  );
}

function mapLineHeightVars(
  scale: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.keys(scale).map((key) => [key, `var(--line-height-${key})`]),
  );
}

function mapFontWeightVars(
  scale: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.keys(scale).map((key) => [key, `var(--font-weight-${key})`]),
  );
}

function mapFontSizeVars(
  sizes: Record<string, string>,
  defaultLeading = "snug",
): Record<string, [string, { lineHeight: string }]> {
  return Object.fromEntries(
    Object.keys(sizes).map((key) => [
      key,
      [
        `var(--font-size-${key})`,
        { lineHeight: `var(--line-height-${defaultLeading})` },
      ],
    ]),
  );
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: flattenColorVars(tokens.color as Record<string, unknown>),
      fontFamily: {
        base: ["var(--font-multiplane)", "sans-serif"],
        sans: ["var(--font-family-sans)"],
        mono: ["var(--font-family-mono)"],
        display: ["var(--font-family-display)"],
      },
      fontSize: mapFontSizeVars(tokens.typography.fontSize),
      fontWeight: mapFontWeightVars(tokens.typography.fontWeight),
      lineHeight: mapLineHeightVars(tokens.typography.lineHeight),
      spacing: mapSpacingVars(tokens.spacing),
      borderRadius: mapRadiusVars(tokens.radius),
      boxShadow: mapShadowVars(tokens.shadow),
      maxWidth: {
        content: "72rem",
        prose: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
