"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface NavChild {
  label: string;
  href: string;
}

interface NavGroupProps {
  label: string;
  children: NavChild[];
  defaultOpen?: boolean;
  onNavigate?: () => void;
}

export function NavGroup({
  label,
  children,
  defaultOpen,
  onNavigate,
}: NavGroupProps) {
  const pathname = usePathname();

  const hasActiveChild = children.some(
    (child) =>
      pathname === child.href || pathname.startsWith(child.href + "/"),
  );

  const [isOpen, setIsOpen] = useState(defaultOpen ?? hasActiveChild);

  return (
    <li className="space-y-0.5">
      {/* Parent toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-1 rounded-md px-2 py-2 text-left text-sm text-surface-foreground-muted transition-colors hover:bg-surface-subtle hover:text-surface-foreground"
      >
        <span className="flex-1">{label}</span>
        <svg
          className={`h-3.5 w-3.5 flex-none text-surface-foreground-subtle transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
        </svg>
      </button>

      {/* Animated children */}
      <div
        className={`grid overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="min-h-0 space-y-0.5 pl-3">
          {/* Left accent bar */}
          <div className="relative">
            <div
              className="pointer-events-none absolute bottom-1 left-0 top-1 w-px bg-surface-border"
              aria-hidden
            />
            {children.map((child) => {
              const isActive = pathname === child.href;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className={`block rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors ${
                      isActive
                        ? "font-semibold text-brand-primary"
                        : "text-surface-foreground-muted hover:bg-surface-subtle hover:text-surface-foreground"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </li>
  );
}
