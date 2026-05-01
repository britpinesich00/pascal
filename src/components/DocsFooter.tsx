export function DocsFooter() {
  return (
    <footer className="border-t border-surface-border bg-surface-elevated">
      <div className="mx-auto max-w-content px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-surface-foreground-muted">
            Pascal Docs · Documentation shell for the Pascal commerce design
            system.
          </p>
          <p className="text-sm text-surface-foreground-subtle">
            Placeholder links · Privacy · Accessibility · Contact
          </p>
        </div>
      </div>
    </footer>
  );
}
