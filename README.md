# Pascal Docs

Documentation shell for the **Pascal** commerce design system — foundations, components, patterns, and resources — built with **Next.js (App Router)** and **Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design tokens

**Single source of truth:** `src/tokens/tokens.json`

- **Colors** — brand, neutral scale, semantic (success, warning, error, info), and surface roles used by the docs chrome.
- **Typography** — font stacks, size scale, line heights, and weights.
- **Spacing, radius, shadow** — scales referenced by layout and elevation.

**Synced CSS variables:** Running `npm run sync:tokens` (also runs before `dev` and `build`) regenerates `src/styles/generated-token-vars.css`. That file defines `:root` custom properties such as `--color-brand-primary` and `--font-size-lg`. Do not edit it by hand.

**Tailwind:** `tailwind.config.ts` extends the theme so utilities resolve to those variables — for example `bg-brand-primary` → `background-color: var(--color-brand-primary)`. Tailwind does not duplicate raw hex or length values; it points at the same CSS vars as the runtime theme.

**Spacing keys with dots:** JSON keys like `0.5` become safe custom properties (`--spacing-0-5`) because dots are not allowed inside CSS variable names. Tailwind utilities keep the usual names (`p-0.5`, `space-y-0.5`).

### Updating values

1. Edit leaf values in `src/tokens/tokens.json` (use **kebab-case** keys under each group so utilities stay predictable, e.g. `primary-muted`, `foreground-subtle`).
2. Run `npm run sync:tokens` (or start the dev server so `predev` runs).
3. Use new semantic paths in components via Tailwind utilities, or reference `var(--your-token)` in CSS if you add lower-level rules later.

To bootstrap strictly with **`#REPLACE_ME`** color placeholders, set color leaves to that string, sync, then swap in the real Pascal palette when ready — note invalid hex will affect rendering until replaced.

## Project layout

| Path | Role |
| --- | --- |
| `src/app/layout.tsx` | Root layout and metadata |
| `src/app/page.tsx` | Homepage shell |
| `src/app/globals.css` | Tailwind layers + base body styles |
| `src/components/` | `SiteShell`, header, sidebar, footer |
| `scripts/sync-tokens.mjs` | JSON → CSS variables |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run sync:tokens` | Regenerate CSS variables from `tokens.json` |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
