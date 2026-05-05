function Badge({ n }: { n: number }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: "var(--color-neutral-950)",
        color: "var(--color-neutral-0)",
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-xs)",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

export function TokenAnatomyDiagram() {
  const dotGrid = {
    backgroundImage:
      "radial-gradient(circle, var(--color-surface-border) 1.5px, transparent 1.5px)",
    backgroundSize: "20px 20px",
    backgroundColor: "var(--color-surface-canvas)",
  };

  const sharedPillCell: React.CSSProperties = {
    textAlign: "center" as const,
    fontFamily: "var(--font-family-mono)",
    fontSize: "var(--font-size-base)",
    fontWeight: 600,
    color: "var(--color-neutral-0)",
    padding: "12px 28px",
    lineHeight: 1,
  };

  return (
    <div
      style={{
        borderRadius: "var(--radius-2xl)",
        border: "1px solid var(--color-surface-border)",
        overflow: "hidden",
      }}
    >
      {/* ── Dotted grid area ── */}
      <div
        style={{
          ...dotGrid,
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* Pill row */}
        <div style={{ display: "flex", width: "100%", maxWidth: 400 }}>
          {/* Segment 1: color */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                ...sharedPillCell,
                backgroundColor: "var(--color-neutral-950)",
                borderRadius: "var(--radius-full) 0 0 var(--radius-full)",
                borderTop: "2px solid var(--color-neutral-800)",
                borderLeft: "2px solid var(--color-neutral-800)",
                borderBottom: "2px solid var(--color-neutral-800)",
                borderRight: "1px solid var(--color-neutral-700)",
              }}
            >
              color
            </div>
          </div>
          {/* Segment 2: .primary */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                ...sharedPillCell,
                backgroundColor: "var(--color-neutral-900)",
                borderRadius: "0 var(--radius-full) var(--radius-full) 0",
                borderTop: "2px solid var(--color-neutral-800)",
                borderRight: "2px solid var(--color-neutral-800)",
                borderBottom: "2px solid var(--color-neutral-800)",
                borderLeft: "1px solid var(--color-neutral-700)",
              }}
            >
              .primary
            </div>
          </div>
        </div>

        {/* Dashed connector row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              paddingTop: 1,
            }}
          >
            <div
              style={{
                width: 0,
                height: 36,
                borderLeft: "2px dashed var(--color-neutral-600)",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              paddingTop: 1,
            }}
          >
            <div
              style={{
                width: 0,
                height: 36,
                borderLeft: "2px dashed var(--color-neutral-600)",
              }}
            />
          </div>
        </div>

        {/* Badge row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Badge n={1} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Badge n={2} />
          </div>
        </div>
      </div>

      {/* ── Key ── */}
      <div
        style={{
          borderTop: "1px solid var(--color-surface-border)",
          backgroundColor: "var(--color-surface-elevated)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderRight: "1px solid var(--color-surface-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <Badge n={1} />
            <span
              style={{
                fontWeight: 600,
                fontSize: "var(--font-size-sm)",
                color: "var(--color-surface-foreground)",
              }}
            >
              Category
            </span>
          </div>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-surface-foreground-muted)",
              margin: 0,
            }}
          >
            The type of design property this token controls
          </p>
        </div>
        <div style={{ padding: "1.25rem 1.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <Badge n={2} />
            <span
              style={{
                fontWeight: 600,
                fontSize: "var(--font-size-sm)",
                color: "var(--color-surface-foreground)",
              }}
            >
              Role
            </span>
          </div>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-surface-foreground-muted)",
              margin: 0,
            }}
          >
            The semantic purpose the color serves across brands
          </p>
        </div>
      </div>
    </div>
  );
}
