# EduTrade — TUT Student Marketplace

A marketplace prototype for TUT students and lecturers to buy, sell and connect
over academic/student-related technology (laptops, phones, tablets, textbooks,
study materials, calculators, and electronics/accessories). Built as a JGA
group project.

Stack: **React 18 + Vite + React Router (HashRouter)**, plain CSS — no UI
framework, no backend required to run.

---

## Why it's built this way (and how it avoids the old blank-page problem)

- **HashRouter, not BrowserRouter.** GitHub Pages has no server rewrite
  rules. A `BrowserRouter` link like `/marketplace` 404s on refresh because
  GitHub's static server looks for a real `marketplace/index.html` file.
  `HashRouter` keeps routing after `/#/`, which always resolves to
  `index.html` first — refreshing or deep-linking any page works.
- **`base: '/TUT-Student-Marketplace/'` in `vite.config.js`.** Matches the
  repo name so every built asset path is correct under GitHub Pages'
  sub-path hosting. If you rename the repo, update this one line.
- **An `ErrorBoundary` wraps the whole app** (`src/components/ErrorBoundary.jsx`).
  If any single page throws at runtime, you get a friendly "Back to Home"
  screen instead of a blank white page — the rest of the app keeps working.
- **The Base44/AI integration is isolated** in `src/lib/base44.js`. Every
  call is wrapped so a missing config, a network error, or a 401/403 always
  falls back to local demo data — it can never blank or crash the site.
  Nothing else in the app imports Base44 directly.
- **No page requires login to render.** Auth is mocked via `localStorage`
  (`src/context/AuthContext.jsx`) purely for the demo; Dashboard/Profile/
  Messages/Notifications show a "continue as demo student" prompt instead of
  redirecting or blocking.

---

## 1. What was created

```
TUT-Student-Marketplace/
├── .github/workflows/deploy.yml   # GitHub Actions → builds & deploys to Pages
├── src/
│   ├── main.jsx                   # Entry point, HashRouter + ErrorBoundary
│   ├── App.jsx                    # All routes
│   ├── index.css                  # Design system (single global stylesheet)
│   ├── context/AuthContext.jsx    # Mock auth (localStorage-based)
│   ├── lib/base44.js              # Isolated backend client, safe fallback
│   ├── lib/mockData.js            # Demo listings/categories/stats/FAQ
│   ├── components/                # Navbar, Footer, ListingCard, AIAssistant, ErrorBoundary
│   └── pages/                     # One file per route (20 pages)
├── vite.config.js
├── package.json
└── .env.example
```

All 20 routes requested are implemented and render without requiring login:
`/`, `/login`, `/register`, `/forgot-password`, `/reset-password`,
`/dashboard`, `/marketplace`, `/product/:id`, `/profile`, `/messages`,
`/notifications`, `/accommodation`, `/services`, `/businesses`, `/schedule`,
`/sell`, `/revenue`, `/admin`, `/about`, plus a catch-all 404 page.

Every file was syntax-checked and every relative import verified to resolve
(path + exact case) before delivery — see Limitations below for what that
check does *not* cover.

## 2. How to run it locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). To test a
production build locally:

```bash
npm run build
npm run preview
```

## 3. How to connect/sync it with GitHub

I don't have network access in this environment, so I can't push to GitHub
for you — here's exactly how to do it.

**If `TENDOPA/TUT-Student-Marketplace` doesn't exist yet, or you're fine
replacing its contents:**

```bash
cd TUT-Student-Marketplace
git init
git add .
git commit -m "Rebuild: EduTrade marketplace (Vite + React + HashRouter)"
git branch -M main
git remote add origin https://github.com/TENDOPA/TUT-Student-Marketplace.git
git push -u origin main --force
```

Only use `--force` if you're deliberately replacing what's there now — it
overwrites the remote history.

**If you want to keep the existing repo untouched and compare first**, push
to a new branch instead:

```bash
cd TUT-Student-Marketplace
git init
git add .
git commit -m "Rebuild: EduTrade marketplace (Vite + React + HashRouter)"
git remote add origin https://github.com/TENDOPA/TUT-Student-Marketplace.git
git fetch origin
git checkout -b rebuild-vite-react
git push -u origin rebuild-vite-react
```

Then open a Pull Request on GitHub from `rebuild-vite-react` into `main` so
you can review the diff before merging — nothing on `main` changes until you
merge it.

## 4. How to deploy it

The included workflow (`.github/workflows/deploy.yml`) builds and deploys to
GitHub Pages automatically on every push to `main`. One-time setup on GitHub:

1. Push the code (step 3 above).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab) — it
   builds with `npm ci && npm run build` and deploys the `dist/` folder.

No secrets are required to deploy — the app runs fully on demo data out of
the box. The `VITE_BASE44_APP_ID` / `VITE_BASE44_API_URL` build args are only
used if you later add those as repo secrets (**Settings → Secrets and
variables → Actions**) to wire up a real Base44 backend.

## 5. Final GitHub Pages URL structure

```
https://tendopa.github.io/TUT-Student-Marketplace/#/
https://tendopa.github.io/TUT-Student-Marketplace/#/marketplace
https://tendopa.github.io/TUT-Student-Marketplace/#/product/1
https://tendopa.github.io/TUT-Student-Marketplace/#/sell
...etc for every route
```

The `#/` is expected and correct — that's HashRouter, and it's what makes
refresh and direct links reliable on GitHub Pages.

## 6. Remaining limitations

- **I could not run `npm install` / `npm run build` myself** — this sandbox
  has no network access, so npm can't reach its registry. I syntax-checked
  every file with esbuild and verified every import resolves to a real file
  with matching case (the two most common causes of a blank Pages build),
  but a real `npm run build` on your machine or in the Actions workflow is
  the first true end-to-end test. If it fails, send me the exact error and
  I'll fix it.
- **I could not push to GitHub or create the Actions run myself** — same
  reason, no network access from here. Use the commands in section 3.
- **Base44 is not actually wired up** — `src/lib/base44.js` is a working,
  safe client shell, but without your real `VITE_BASE44_APP_ID` /
  `VITE_BASE44_API_URL` it always runs in local demo-data mode (which is
  also the safe default for presenting this project).
- **Auth, messages, notifications and the admin dashboard are mock/local
  only** — no real database, matching the brief's "demo/mock authentication
  is acceptable" allowance.
