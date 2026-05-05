"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "/foundations/typography/overview" },
  { label: "Fonts", href: "/foundations/typography/fonts" },
  { label: "Typescale & tokens", href: "/foundations/typography/typescale" },
  { label: "Apply type", href: "/foundations/typography/apply" },
] as const;

export default function TypographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-0 pb-16">
      {/* Page header */}
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-surface-foreground">
          Typography
        </h1>
        <p className="text-surface-foreground-muted">
          A purposeful, scalable type system that unifies Disney+, Hulu, and
          ESPN through role-based tokens and brand-specific typefaces
        </p>
      </div>

      {/* Tab bar */}
      <div className="border-b border-surface-border">
        <nav className="-mb-px flex gap-0" aria-label="Typography section">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-5 pb-3 pt-1 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-muted focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-b-2 border-brand-primary text-brand-primary"
                    : "border-b-2 border-transparent text-surface-foreground-muted hover:text-surface-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Page content */}
      <div className="pt-8">{children}</div>
    </div>
  );
}
