# arunpaudel.com

Personal portfolio for Arun Paudel. Visitors pick a **GUI** (a normal scrollable page) or a **TUI** (an interactive terminal). Both render from one content file.

Vite + React + TypeScript, plain CSS, no backend. Builds to a static `dist/`.

## Local development

```bash
npm install
npm run dev       # dev server (http://localhost:5173)
npm run build     # type-check + production build into dist/
npm run lint
```

## Updating the resume

Replace `public/resume.pdf` with your new file **using the same name**, then commit and push. It downloads as `Arun_Paudel_Resume.pdf`.

## Updating content

Edit `src/content.ts`. The GUI and the TUI both read from it, so one edit updates both. Email goes through Gmail compose / copy buttons rather than mail-app links, so it works without a desktop mail client. Search the file for `TODO` to find anything still missing.

## Common changes

**Add a TUI command**
Add an object to the `commands` array in `src/tui/commands.ts`:

```ts
{
  name: 'hello',
  aliases: ['hi'],
  description: 'Say hello',
  run: (args, ctx) => [line('Hello, ', t('world', 'accent'))],
}
```

`run` returns lines built with the helpers in `src/tui/out.ts` (`t` for styled text, `link` for links, `cmd` for clickable commands). It shows up in `help` and tab completion automatically. `ctx` gives access to `clear`, `setTheme`, `navigate` and `downloadResume`.

**Add a GUI section**
1. Add its copy to `content.sections` in `src/content.ts`, then create a component in `src/gui/` that reads from `content` and wraps itself in `Section` from `src/gui/ui.tsx`.
2. Render it in `src/gui/Gui.tsx`.
3. Add its id to the `SECTIONS` list in `src/gui/TopBar.tsx` if it should get a nav link.

**Regenerate the social preview image**
`public/og.png` is rendered from `scripts/og.svg`. Edit the SVG, then run `scripts/make-og.mjs` (the file header lists the one-off setup; Playwright is not a project dependency).

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo. Vite is auto-detected (build `npm run build`, output `dist`).
3. Deploy. Every push to `main` redeploys automatically.
4. Under **Project → Settings → Domains**, add `arunpaudel.com` and follow the DNS instructions.

`vercel.json` rewrites every path to `index.html` so refreshing `/gui` or `/tui` works.

## Routes

| Path | What |
| --- | --- |
| `/` | Interface selector (redirects to your saved choice) |
| `/?choose` | Always shows the selector |
| `/gui` | Scrollable portfolio |
| `/tui` | Interactive terminal (`help` to start) |

## Credits

Theme: [Dracula & Alucard](https://draculatheme.com) by the Dracula Theme team.
