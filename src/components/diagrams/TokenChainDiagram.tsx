function Pill({
  token,
  accent = false,
}: {
  token: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: accent
          ? "var(--color-brand-primary)"
          : "var(--color-neutral-950)",
        borderRadius: "var(--radius-full)",
        padding: "7px 16px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-neutral-0)",
          whiteSpace: "nowrap" as const,
        }}
      >
        {token}
      </span>
    </div>
  );
}

function DownArrow() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: 32 }}>
      <svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        aria-hidden
      >
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="22"
          stroke="var(--color-neutral-600)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <polyline
          points="4,18 10,28 16,18"
          stroke="var(--color-neutral-600)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface ChainRowProps {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}

function ChainRow({ label, sublabel, children }: ChainRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem 1.5rem",
      }}
    >
      {/* Left label column */}
      <div style={{ width: 130, flexShrink: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            color: "var(--color-surface-foreground)",
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-size-xs)",
            color: "var(--color-surface-foreground-muted)",
          }}
        >
          {sublabel}
        </p>
      </div>

      {/* Vertical rule */}
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundColor: "var(--color-surface-border)",
          flexShrink: 0,
        }}
      />

      {/* Token / value */}
      <div>{children}</div>
    </div>
  );
}

function ArrowRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        paddingLeft: "1.5rem",
        borderTop: "1px solid var(--color-surface-border)",
        borderBottom: "1px solid var(--color-surface-border)",
        backgroundColor: "var(--color-surface-canvas)",
        paddingTop: 0,
        paddingBottom: 0,
        height: 32,
      }}
    >
      {/* Spacer matching label column width + gap + rule */}
      <div style={{ width: 130, flexShrink: 0 }} />
      <div style={{ width: 1, flexShrink: 0 }} />
      <div style={{ paddingLeft: "0.5rem" }}>
        <DownArrow />
      </div>
    </div>
  );
}

export function TokenChainDiagram() {
  return (
    <div
      style={{
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--color-surface-border)",
        overflow: "hidden",
        backgroundColor: "var(--color-surface-elevated)",
      }}
    >
      {/* Row 1: Component token */}
      <ChainRow label="Component token" sublabel="button.color.*">
        <Pill token="button.color.background" />
      </ChainRow>

      <ArrowRow />

      {/* Row 2: System token */}
      <ChainRow label="System token" sublabel="color.*">
        <Pill token="color.primary" />
      </ChainRow>

      <ArrowRow />

      {/* Row 3: Reference token */}
      <ChainRow label="Reference token" sublabel="palette.step">
        <Pill token="blue.blue-50" />
      </ChainRow>

      <ArrowRow />

      {/* Row 4: Value */}
      <ChainRow label="Value" sublabel="Resolved hex">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "var(--radius-sm)",
              backgroundColor: "#1877F2",
              flexShrink: 0,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-surface-foreground)",
            }}
          >
            #1877F2
          </span>
        </div>
      </ChainRow>
    </div>
  );
}
