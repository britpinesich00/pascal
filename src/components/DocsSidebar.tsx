"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavGroup } from "@/components/nav/NavGroup";

// ── Nav data ───────────────────────────────────────────────────────────────

const COLOR_CHILDREN = [
  { label: "Overview", href: "/foundations/colors/overview" },
  { label: "Usage", href: "/foundations/colors/usage" },
  { label: "Tokens", href: "/foundations/colors/tokens" },
  { label: "Primitives", href: "/foundations/colors/primitives" },
  { label: "Code", href: "/foundations/colors/code" },
];

type FlatItem = { type: "link"; label: string; href: string };
type GroupItem = {
  type: "group";
  label: string;
  children: { label: string; href: string }[];
};
type NavItem = FlatItem | GroupItem;
type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { type: "link", label: "Introduction", href: "/" },
      { type: "link", label: "Getting started", href: "#" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { type: "group", label: "Color", children: COLOR_CHILDREN },
      { type: "link", label: "Typography", href: "#" },
      { type: "link", label: "Elevation", href: "#" },
    ],
  },
  {
    title: "Components",
    items: [
      { type: "link", label: "All components", href: "#" },
      { type: "link", label: "Status & roadmap", href: "#" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { type: "link", label: "Commerce flows", href: "#" },
      { type: "link", label: "Layouts", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { type: "link", label: "Design toolkit", href: "#" },
      { type: "link", label: "Release notes", href: "#" },
    ],
  },
];

// ── Sidebar ────────────────────────────────────────────────────────────────

type DocsSidebarProps = {
  open: boolean;
  onNavigate: () => void;
};

export function DocsSidebar({ open, onNavigate }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-hidden={!open}
        className={`fixed inset-0 z-30 bg-surface-inverse/40 backdrop-blur-[2px] transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onNavigate}
        tabIndex={open ? 0 : -1}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-surface-border bg-surface-elevated transition-transform lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          open ? "translate-x-0 shadow-lg" : "-translate-x-full"
        }`}
      >
        <nav
          className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6 lg:py-8"
          aria-label="Primary documentation"
        >
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-2 text-2xs font-semibold text-surface-foreground-muted">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  if (item.type === "group") {
                    return (
                      <NavGroup
                        key={item.label}
                        label={item.label}
                        children={item.children}
                        onNavigate={onNavigate}
                      />
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={`block rounded-md px-2 py-2 text-sm transition-colors ${
                          isActive
                            ? "font-semibold text-brand-primary"
                            : "text-surface-foreground-muted hover:bg-surface-subtle hover:text-surface-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
