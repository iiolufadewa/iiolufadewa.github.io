# iiolufadewa.github.io

Personal website for **Dr. Isaac Iyinoluwa Olufadewa, MBBS, PhD** — physician-scientist and AI global-health researcher.

Static site (plain HTML/CSS/JS). No build step, no dependencies. Hosted on GitHub Pages.

## Structure

```
.
├── index.html            Home (hero, research pillars, focus areas, selected work, field notes, affiliations, contact)
├── research.html         Research programme, flagship projects, technical stack
├── publications.html     Filterable selected publications + metrics
├── about.html            Full bio, career timeline, honours
├── 404.html              Branded not-found page
├── .nojekyll             Tells GitHub Pages to serve files as-is (no Jekyll)
├── robots.txt / sitemap.xml
└── assets/
    ├── css/style.css     Design system (all styling)
    ├── js/main.js        Hero network animation, nav, scroll reveals, publication filters
    ├── img/              favicon.svg, portrait-placeholder.svg
    └── docs/             Isaac-Olufadewa-CV.pdf  (placeholder — replace with the real CV)
```

## Things to personalise before / after launch

1. **Headshot** — replace `assets/img/portrait-placeholder.svg` with a real photo.
   - Easiest: save the photo as `assets/img/isaac.jpg`, then update the two `<img src="assets/img/portrait-placeholder.svg" ...>` references (in `index.html` and `about.html`) to `assets/img/isaac.jpg`.
2. **CV** — replace `assets/docs/Isaac-Olufadewa-CV.pdf` with the real CV, keeping the same filename.
3. **Field notes / dates** (`index.html`) — edit or add updates as needed.
4. **Publications** — the list is a curated selection; add or edit entries in `publications.html`. Each `<article class="pub" data-tags="...">` supports tags: `ai mental infect global mnch preprint`.
5. **Verify metadata** — publication venues/citation counts were compiled from Google Scholar and public sources; confirm against the live Scholar profile.

## Design notes

- Palette: Petrol Ink `#0f2233`, Porcelain `#f4f6f5`, Jade `#12876a`, Coral `#ee6c4d`.
- Type: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (data/labels) — loaded from Google Fonts.
- Signature element: the hero "transmission network" (canvas) — a nod to his network-epidemiology work.
- Accessibility: keyboard focus rings, reduced-motion support, responsive to mobile.
