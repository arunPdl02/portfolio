// Renders scripts/og.svg to public/og.png (1200x630) with a headless browser.
// Not a project dependency: install playwright just for this, then run
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/make-og.mjs
// Set CHROME_PATH to use an existing Chromium/Chrome binary instead.
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(resolve(root, 'scripts/og.svg'), 'utf8')
const html = `<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" />
    <style>html,body{margin:0;background:#282A36}svg{display:block}</style>
  </head>
  <body>${svg}</body>
</html>`

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {})
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(root, 'public/og.png') })
await browser.close()
console.log('wrote public/og.png')
