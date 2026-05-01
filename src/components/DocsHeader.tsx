import Link from "next/link";

type DocsHeaderProps = {
  onMenuToggle: () => void;
};

export function DocsHeader({ onMenuToggle }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-surface-elevated/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-none items-center gap-4 px-4 lg:px-6">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-surface-foreground transition-colors hover:bg-surface-subtle lg:hidden"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <Link
            href="/"
            className="font-base text-lg font-semibold tracking-tight text-surface-foreground"
          >
            Pascal Docs
          </Link>
          <label className="hidden max-w-md flex-1 md:block">
            <span className="sr-only">Search</span>
            <input
              type="search"
              placeholder="Search documentation"
              readOnly
              className="w-full rounded-lg border border-surface-border bg-surface-subtle px-3 py-2 text-sm text-surface-foreground placeholder:text-surface-foreground-subtle focus-visible:border-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-muted"
            />
          </label>
        </div>
      </div>
    </header>
  );
}
