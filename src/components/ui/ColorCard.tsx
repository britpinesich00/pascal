import { getContrastColor } from "@/utils/colorUtils";

interface ColorCardProps {
  /** Semantic token name, e.g. "surface" or "on-brand" */
  tokenName: string;
  /** Primitive reference for the active brand, e.g. "neutral-10". Null = pending. */
  primitiveRef: string | null;
  /** Resolved hex value, e.g. "#17171B". Null = pending. */
  hex: string | null;
  /** Pre-computed HSL string, e.g. "hsl(240, 7%, 10%)". Null = pending. */
  hsl: string | null;
}

export function ColorCard({ tokenName, primitiveRef, hex, hsl }: ColorCardProps) {
  const isPending = hex === null;
  const textColor = hex ? getContrastColor(hex) : undefined;

  return (
    <div className="overflow-hidden rounded-xl border border-surface-border">
      {/* ── Swatch ── */}
      {isPending ? (
        <div
          className="relative flex h-28 items-center justify-center bg-surface-subtle sm:h-32"
          aria-label="Color pending"
        >
          {/* Diagonal stripe overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent 0px, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)",
            }}
            aria-hidden
          />
          <span className="relative text-xs text-surface-foreground-subtle">
            Pending
          </span>
        </div>
      ) : (
        <div
          className="relative h-28 sm:h-32"
          style={{ backgroundColor: hex! }}
        >
          <span
            className="absolute left-2.5 top-2.5 font-mono text-xs font-medium"
            style={{ color: textColor }}
          >
            {hex!.toUpperCase()}
          </span>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="border-t border-surface-border bg-surface-canvas px-3 py-2.5">
        <p
          className="truncate text-xs font-semibold text-surface-foreground"
          title={tokenName}
        >
          {tokenName}
        </p>
        <p
          className="mt-0.5 truncate text-xs text-surface-foreground-muted"
          title={primitiveRef ?? undefined}
        >
          {isPending ? "—" : (primitiveRef ?? "—")}
        </p>
        <p className="mt-0.5 font-mono text-xs text-surface-foreground-subtle">
          {isPending ? "—" : hsl}
        </p>
      </div>
    </div>
  );
}
