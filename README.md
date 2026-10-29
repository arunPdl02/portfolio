# arunpaudel.com

Personal portfolio for Arun Paudel: a GUI and a TUI, both rendered from `src/content.ts`.

> Work in progress. Full docs land in a later phase.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + static build into dist/
npm run lint
```

## Deploying

Import the GitHub repo in Vercel (Vite is auto-detected). `vercel.json` rewrites all routes to `index.html` so `/gui` and `/tui` survive a refresh. Every push to `main` redeploys.
