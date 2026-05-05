"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ReferenceTokenDiagram } from "@/components/diagrams/ReferenceTokenDiagram";
import { TokenAnatomyDiagram } from "@/components/diagrams/TokenAnatomyDiagram";
import { TokenChainDiagram } from "@/components/diagrams/TokenChainDiagram";

// ── Table of contents ──────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "color-anatomy", label: "Color anatomy" },
  { id: "applying-color", label: "Applying color with tokens" },
  { id: "color-roles", label: "Color roles" },
  { id: "accessibility", label: "Accessibility" },
  { id: "related", label: "Related" },
];

function TableOfContents({ activeId }: { activeId: string }) {
  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold text-surface-foreground-muted">
        On this page
      </p>
      <ul className="space-y-1.5">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeId === item.id
                  ? "font-semibold text-brand-primary"
                  : "text-surface-foreground-muted hover:text-surface-foreground"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
  first = false,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 space-y-6 ${
        first ? "" : "border-t border-surface-border pt-12"
      }`}
    >
      <h2 className="text-xl font-semibold text-surface-foreground">{title}</h2>
      {children}
    </section>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const COLOR_ROLES = [
  {
    name: "primary",
    description:
      "Main brand action color. Used for primary buttons, links, and key interactive elements.",
  },
  {
    name: "secondary",
    description:
      "Supporting brand color. Used for secondary actions and accents.",
  },
  {
    name: "surface",
    description: "Page-level background and container colors. Includes surface, surface-variant, and surface-container variants for layering depth.",
  },
  {
    name: "error",
    description:
      "Communicates destructive actions or critical error states.",
  },
  {
    name: "warning",
    description:
      "Communicates caution or situations that need attention.",
  },
  {
    name: "success",
    description: "Communicates a positive or completed outcome.",
  },
  {
    name: "info",
    description: "Communicates informational or in-progress states.",
  },
  {
    name: "outline",
    description: "Border and divider colors.",
  },
  {
    name: "inverse",
    description: "For elements placed on bold or dark backgrounds.",
  },
];

const RELATED_LINKS = [
  { label: "Color Primitives", href: "/foundations/colors/primitives" },
  { label: "Semantic Tokens", href: "/foundations/colors/tokens" },
  { label: "Code usage", href: "/foundations/colors/code" },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function ColorsOverviewPage() {
  const [activeId, setActiveId] = useState("color-anatomy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0% -65% 0%", threshold: 0 },
    );

    for (const { id } of TOC_ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[1fr_13rem] lg:gap-16">
      {/* ── Main content ── */}
      <article className="space-y-12 pb-16">

        {/* 1. Color anatomy */}
        <Section id="color-anatomy" title="Color anatomy" first>
          <p className="max-w-prose text-surface-foreground-muted">
            Pascal uses three types of color, each with a distinct role in the system.
            Primitives define the raw palette. Semantic tokens give colors purpose.
            Component tokens scope colors to specific UI elements.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Primitive colors",
                body: "The raw color scales for each brand, from 05 to 95. Primitives are never used directly in components; they exist to feed the semantic layer.",
              },
              {
                step: "02",
                title: "Semantic colors",
                body: "Role-based tokens that map to primitives and carry meaning in the UI: primary, error, surface, inverse, and so on. These are what components consume.",
              },
              {
                step: "03",
                title: "Component tokens",
                body: "Pascal-specific tokens scoped to individual components, like button-background or input-border. Built on top of semantic tokens for extra precision.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="space-y-3 rounded-xl border border-surface-border bg-surface-elevated p-5"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-primary-muted">
                  <span className="font-mono text-xs font-semibold text-brand-primary">
                    {item.step}
                  </span>
                </div>
                <p className="font-semibold text-surface-foreground">{item.title}</p>
                <p className="text-sm text-surface-foreground-muted">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Color ramp placeholders */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-surface-foreground">
              Brand primitive ramps
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Disney+", "Hulu", "ESPN"].map((brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-xl border border-dashed border-surface-border bg-surface-subtle px-4 py-10"
                >
                  <p className="text-center text-xs text-surface-foreground-muted">
                    Color ramp · {brand}
                    <br />
                    coming soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 2. Applying color with tokens */}
        <Section id="applying-color" title="Applying color with tokens">
          <p className="max-w-prose text-surface-foreground-muted">
            Pascal organizes color into three levels: raw reference values,
            brand-agnostic semantic roles, and component-scoped tokens. Each
            level builds on the one below it, so changing a primitive value
            automatically updates every component that references it.
          </p>

          {/* Diagram 1 — Reference tokens */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-surface-foreground">
              Reference tokens
            </h3>
            <p className="text-sm text-surface-foreground-muted">
              Reference tokens (primitives) are the raw building blocks of the
              palette. Each token resolves directly to a single value: a hex
              color or a font name. They follow a{" "}
              <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
                palette.palette-step
              </code>{" "}
              naming convention, where the step indicates lightness within the
              scale.
            </p>
            <ReferenceTokenDiagram />
          </div>

          {/* Diagram 2 — Token anatomy */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-surface-foreground">
              Token anatomy
            </h3>
            <p className="text-sm text-surface-foreground-muted">
              Semantic tokens are role-based names that carry meaning
              independent of any specific brand. The token name encodes two
              pieces of information: the design property category and the
              semantic role it plays in the UI.
            </p>
            <TokenAnatomyDiagram />
          </div>

          {/* Diagram 3 — Full token chain */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-surface-foreground">
              Token chain
            </h3>
            <p className="text-sm text-surface-foreground-muted">
              Component tokens are the point of use. They map to a semantic
              token, which maps to a reference token, which finally resolves to
              a raw value. Swapping a brand only requires remapping the
              reference level. Everything above it updates automatically.
            </p>
            <TokenChainDiagram />
          </div>
        </Section>

        {/* 3. Color roles */}
        <Section id="color-roles" title="Color roles">
          <p className="max-w-prose text-surface-foreground-muted">
            Color roles describe the intention behind a color, not its visual
            appearance. A token named{" "}
            <code className="rounded bg-surface-subtle px-1 font-mono text-xs">
              error
            </code>{" "}
            communicates a destructive state regardless of whether the resolved
            color is red, orange, or another brand hue.
          </p>

          <div className="overflow-hidden rounded-xl border border-surface-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-brand-primary">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-surface-elevated">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-surface-elevated">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {COLOR_ROLES.map((role) => (
                  <tr key={role.name} className="bg-surface-elevated">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-surface-foreground">
                      {role.name}
                    </td>
                    <td className="px-4 py-3 text-surface-foreground-muted">
                      {role.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 4. Accessibility */}
        <Section id="accessibility" title="Accessibility">
          <p className="max-w-prose text-surface-foreground-muted">
            Pascal is committed to WCAG 2.1 AA compliance across all three brands.
            All semantic color pairings in the system have been verified against the
            following contrast requirements.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-surface-border bg-surface-elevated p-5">
              <p className="text-3xl font-semibold tracking-tight text-surface-foreground">
                4.5:1
              </p>
              <p className="mt-1 font-semibold text-surface-foreground">
                Small text
              </p>
              <p className="mt-1 text-sm text-surface-foreground-muted">
                Body text below 24px regular weight (18.67px bold). Required for
                all paragraph text, labels, and captions.
              </p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-elevated p-5">
              <p className="text-3xl font-semibold tracking-tight text-surface-foreground">
                3:1
              </p>
              <p className="mt-1 font-semibold text-surface-foreground">
                Large text &amp; UI components
              </p>
              <p className="mt-1 text-sm text-surface-foreground-muted">
                Text at 24px or larger, and UI components such as buttons, inputs,
                and icons that convey meaning.
              </p>
            </div>
          </div>

          <p className="text-sm text-surface-foreground-muted">
            To verify contrast ratios independently, use the raw hex values from the{" "}
            <Link
              href="/foundations/colors/primitives"
              className="font-semibold text-brand-primary underline underline-offset-2 hover:no-underline"
            >
              Color Primitives
            </Link>{" "}
            page with any WCAG contrast checker.
          </p>
        </Section>

        {/* 7. Related */}
        <Section id="related" title="Related">
          <ul className="space-y-2">
            {RELATED_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline underline-offset-2"
                >
                  {link.label}
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8h10M9 4l4 4-4 4"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </article>

      {/* ── Sticky TOC (desktop only) ── */}
      <aside className="hidden lg:block">
        <div className="sticky top-[5.5rem]">
          <TableOfContents activeId={activeId} />
        </div>
      </aside>
    </div>
  );
}
