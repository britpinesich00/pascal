function UpArrow() {
  return (
    <svg
      width="20"
      height="44"
      viewBox="0 0 20 44"
      fill="none"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <line
        x1="10"
        y1="42"
        x2="10"
        y2="14"
        stroke="var(--color-neutral-700)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polyline
        points="4,18 10,6 16,18"
        stroke="var(--color-neutral-700)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TokenChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "var(--color-neutral-900)",
        border: "1px solid var(--color-neutral-700)",
        borderRadius: "var(--radius-full)",
        padding: "6px 14px 6px 6px",
      }}
    >
      {children}
    </div>
  );
}

export function ReferenceTokenDiagram() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-neutral-950)",
        borderRadius: "var(--radius-2xl)",
        padding: "2.5rem 2rem",
        display: "flex",
        gap: "4rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* ── Left: color reference token ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-neutral-500)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Raw value
        </span>

        {/* Color swatch */}
        <div
          style={{
            width: 160,
            height: 88,
            backgroundColor: "#1877F2",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            padding: "10px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--font-size-xs)",
              color: "#ffffff",
              fontWeight: 500,
            }}
          >
            #1877F2
          </span>
        </div>

        <UpArrow />

        {/* Token chip */}
        <TokenChip>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#1877F2",
              border: "1px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-neutral-0)",
            }}
          >
            blue.blue-50
          </span>
        </TokenChip>

        {/* Bottom label */}
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-neutral-500)",
          }}
        >
          Reference token
        </span>
      </div>

      {/* ── Right: font reference token ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-neutral-500)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Raw value
        </span>

        {/* Font name display */}
        <div
          style={{
            width: 200,
            height: 88,
            backgroundColor: "var(--color-neutral-900)",
            border: "1px solid var(--color-neutral-800)",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "1.125rem",
              color: "var(--color-neutral-0)",
              fontWeight: 600,
            }}
          >
            Multiplane TWDC
          </span>
        </div>

        <UpArrow />

        {/* Font token chip */}
        <TokenChip>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "var(--color-neutral-700)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "10px",
                color: "var(--color-neutral-0)",
                fontWeight: 700,
              }}
            >
              M
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--font-size-sm)",
              color: "var(--color-neutral-0)",
            }}
          >
            font.family.base
          </span>
        </TokenChip>

        {/* Bottom label */}
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-neutral-500)",
          }}
        >
          Reference token
        </span>
      </div>
    </div>
  );
}
