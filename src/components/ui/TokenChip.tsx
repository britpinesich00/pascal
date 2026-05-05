interface TokenChipProps {
  token: string;
}

export function TokenChip({ token }: TokenChipProps) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-xs)",
        color: "var(--color-surface-foreground-muted)",
        background: "var(--color-surface-subtle)",
        border: "1px solid var(--color-surface-border)",
        borderRadius: "var(--radius-full, 9999px)",
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {token}
    </span>
  );
}
