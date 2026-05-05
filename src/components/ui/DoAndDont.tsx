import React from "react";

interface DoAndDontProps {
  doLabel: string;
  dontLabel: string;
  doContent?: React.ReactNode;
  dontContent?: React.ReactNode;
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 7l3.5 3.5 6.5-6.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function DoCard({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-semantic-success-border)",
        overflow: "hidden",
      }}
    >
      {/* Example area */}
      <div
        style={{
          backgroundColor: "var(--color-semantic-success-background)",
          padding: "var(--spacing-6)",
          minHeight: "7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children ?? (
          <span
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-semantic-success-foreground)",
              textAlign: "center",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Label bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          padding: "var(--spacing-3) var(--spacing-4)",
          borderTop: "1px solid var(--color-semantic-success-border)",
          backgroundColor: "var(--color-surface-elevated)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "var(--color-semantic-success-background)",
            color: "var(--color-semantic-success-foreground)",
            border: "1px solid var(--color-semantic-success-border)",
            flexShrink: 0,
          }}
        >
          <CheckIcon />
        </span>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-semantic-success-foreground)",
          }}
        >
          Do
        </span>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-surface-foreground-muted)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function DontCard({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-semantic-error-border)",
        overflow: "hidden",
      }}
    >
      {/* Example area */}
      <div
        style={{
          backgroundColor: "var(--color-semantic-error-background)",
          padding: "var(--spacing-6)",
          minHeight: "7rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children ?? (
          <span
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-semantic-error-foreground)",
              textAlign: "center",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Label bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          padding: "var(--spacing-3) var(--spacing-4)",
          borderTop: "1px solid var(--color-semantic-error-border)",
          backgroundColor: "var(--color-surface-elevated)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "var(--color-semantic-error-background)",
            color: "var(--color-semantic-error-foreground)",
            border: "1px solid var(--color-semantic-error-border)",
            flexShrink: 0,
          }}
        >
          <XIcon />
        </span>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-semantic-error-foreground)",
          }}
        >
          Don&apos;t
        </span>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-surface-foreground-muted)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function DoAndDont({
  doLabel,
  dontLabel,
  doContent,
  dontContent,
}: DoAndDontProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <DoCard label={doLabel}>{doContent}</DoCard>
      <DontCard label={dontLabel}>{dontContent}</DontCard>
    </div>
  );
}
