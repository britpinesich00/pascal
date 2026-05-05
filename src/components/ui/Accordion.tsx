"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Chevron icon
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
// Folder icons (closed / open)
// ---------------------------------------------------------------------------
export function FolderClosedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.379a1 1 0 0 1 .707.293L7.293 5h6.207a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FolderOpenIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.379a1 1 0 0 1 .707.293L7.293 5h6.207a1 1 0 0 1 1 1v.5H1.5V4.5Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3.379a1 1 0 0 1 .707.293L7.293 5h6.207a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V4.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 6.5h13l-1.5 5H3L1.5 6.5Z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Top-level Accordion
// ---------------------------------------------------------------------------
interface AccordionProps {
  label: string;
  badge?: string;
  defaultOpen?: boolean;
  /** Remove padding around the content area so children can span full width */
  noPadding?: boolean;
  children: React.ReactNode;
}

export function Accordion({
  label,
  badge,
  defaultOpen = false,
  noPadding = false,
  children,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid var(--color-surface-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--color-surface-elevated)",
      }}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-3)",
          padding: "var(--spacing-4) var(--spacing-5)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: isOpen
            ? "1px solid var(--color-surface-border)"
            : "none",
          color: "var(--color-surface-foreground)",
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          {label}
        </span>
        {badge && (
          <span
            style={{
              fontSize: "var(--font-size-xs)",
              color: "var(--color-surface-foreground-muted)",
              fontWeight: "var(--font-weight-regular)",
            }}
          >
            {badge}
          </span>
        )}
        <ChevronIcon open={isOpen} />
      </button>

      {/* Animated content region */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 200ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={noPadding ? {} : { padding: "var(--spacing-4)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-level Accordion (folder style)
// ---------------------------------------------------------------------------
interface SubAccordionProps {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SubAccordion({
  label,
  defaultOpen = false,
  children,
}: SubAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid var(--color-surface-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--color-surface-canvas)",
      }}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          padding: "var(--spacing-3) var(--spacing-4)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: isOpen
            ? "1px solid var(--color-surface-border)"
            : "none",
          color: "var(--color-surface-foreground-muted)",
        }}
      >
        <span style={{ color: "var(--color-surface-foreground-muted)" }}>
          {isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />}
        </span>
        <span
          style={{
            flex: 1,
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-surface-foreground)",
          }}
        >
          {label}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 200ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "var(--spacing-4)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
