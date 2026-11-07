# B T Senthan Amuthan — Portfolio

Scroll-driven portfolio told as one visual story: a single server, one user and one request grow — stage by stage — into a load-balanced, cached, queued, replicated system running in three regions. Light and dark themes.

Vite + React + TypeScript + Tailwind v4, Lenis smooth scroll synced to GSAP ScrollTrigger, and a procedural React Three Fiber scene.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build → dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/lib/data.ts` | All copy and resume content. Edit this to update the site. |
| `src/lib/store.ts` | `ScrollProgressStore`: a mutable ref written by ScrollTrigger and read in `useFrame`. Scrolling never re-renders React. |
| `src/lib/sound.ts` | Web Audio synth (drone + UI ticks), no audio files. |
| `src/lib/theme.ts` | Light/dark theme: system preference by default, toggle in the top bar, remembered per browser. |
| `src/world/layout.ts` | Where every part of the system stands. |
| `src/world/live.ts` | Growth model: which stage the system is in, derived from scroll every frame. |
| `src/world/System.tsx` | The system itself — users, app servers, load balancer, cache, database, queue, workers, replicas, edges and live traffic. |
| `src/world/CameraRig.tsx` | Scroll is the camera: one shot per chapter (per stage in Scale), hand-offs, lens shift that keeps the subject clear of the text. |
| `src/world/Dioramas.tsx` | The archive: each experience/project as a small architecture diorama with live traffic. Node layouts are data at the top of the file. |
| `src/world/NewService.tsx` | The Process chapter, inside the system: a new service is designed, built, verified and shipped into an empty slot. |
| `src/world/*` | Regions finale, the skyline, palettes per theme. |
| `src/components/HudChrome.tsx` | Indexed nav, sound toggle, depth gauge rail. |
| `src/sections/*` | The six sections: Origin, Layers, Stack, Archive, Process, Contact. |
| `public/B_T_Senthan_Amuthan_Resume.pdf` | The resume linked from the site — built from `resume/resume.tex` (`cd resume && pdflatex resume.tex`, then copy the PDF here). |
| `resume/resume.tex` | Resume source. Employer-internal names, employer architecture and the phone number are deliberately left out. |

## SEO

Generated at build time from `src/lib/data.ts` by `src/lib/seo.ts` (wired in `vite.config.ts`), so search metadata never drifts from what the page shows:

- `<head>`: canonical URL, description, Open Graph + Twitter cards, JSON-LD (`ProfilePage` → `Person`, `WebSite`).
- A pre-rendered, semantic copy of the profile inside `#root` for crawlers and no-JS visitors; the app replaces it on load.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` emitted into `dist/`.
- `public/og.png` is the 1200×630 social preview card; app icons are `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- Moving to a custom domain: change `site.url` in `src/lib/data.ts`.

## Deploying (Vercel)

- Framework preset **Vite** · build `npm run build` · output `dist` · Node ≥ 22.12 (pinned in `package.json`).
- No environment variables are needed — contact is a `mailto:` link, not a server route.
- Everything the page loads is self-hosted except Google Fonts (the 3D lighting map lives in `public/env/`).
