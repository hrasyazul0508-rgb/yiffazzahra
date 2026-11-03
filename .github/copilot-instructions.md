# Copilot instructions for the Barista Cafe template

## Project type and architecture

This repository is a static marketing website built with plain HTML, CSS, Bootstrap 5, and a small amount of jQuery-based behavior. It is not a framework app, package-based app, or backend service.

The big-picture structure is:

- `index.html`: main landing page with the hero, about section, team/characters, reviews, and contact.
- `reservation.html`: standalone booking page for table reservations.
- `css/`: stylesheet assets. The site uses Bootstrap vendor CSS plus the template-specific theme in `css/tooplate-barista.css`.
- `js/`: JavaScript assets. The custom interactions live in `js/custom.js`; the rest are vendor scripts such as Bootstrap, jQuery, and the Vegas slideshow plugin.
- `images/` and `videos/`: visual assets for the site and the background/hero media.

Most of the app behavior is declarative HTML + CSS; page interactions are largely contained in `js/custom.js` and depend on section IDs like `#section_1`, `#section_2`, and the Bootstrap navbar/scroll behavior.

## Build, test, and lint commands

No build system, test runner, or lint configuration is present in this repository.

Use one of the following for local validation:

- Open `index.html` directly in a browser for quick visual checks.
- Or serve the site locally from the project root:

  ```bash
  cd "<project root>"
  python -m http.server 8000
  ```

  Then open `http://localhost:8000/` in the browser.

There is no automated single-test target to run; when validating changes, prefer a browser-based visual check of the affected page(s).

## Conventions specific to this repo

- Keep the site static and page-based. New work should follow the existing pattern of separate HTML pages and shared CSS/JS assets rather than introducing a framework or app architecture.
- Preserve the existing relative asset paths. Files reference `css/...`, `js/...`, `images/...`, and `videos/...` relatively from the page location.
- Respect the existing Bootstrap 5 structure and section IDs. Navigation links and smooth scrolling rely on anchors like `#section_1` and `#section_2`.
- The design is a template/theme implementation, so changes should stay visually consistent with the current Bootstrap template styling rather than adding new component libraries or custom app structure.
- The forms are front-end placeholders; do not assume backend processing is available. Booking and contact flows are static HTML forms unless a custom backend is added separately.
- External fonts and icon libraries are loaded from CDNs; changes should keep those dependencies compatible with the existing setup.

## Practical editing guidance

- If you are changing the landing page layout or section ordering, update `index.html` and verify the navbar/anchor links still match.
- If you are changing slide behavior or smooth scrolling, check `js/custom.js` and keep the jQuery patterns consistent with the current implementation.
- If you are styling the template, prefer the existing custom CSS rules in `css/tooplate-barista.css` and avoid rewriting the Bootstrap base layer unless absolutely necessary.
- When adding new pages, keep the same include stack and relative paths used by the current HTML files.

## Documentation status

This repository does not currently include a `README.md`, `CONTRIBUTING.md`, or AI configuration files such as `CLAUDE.md`, `AGENTS.md`, or `.cursorrules`. This instruction file reflects the project’s actual structure and workflow as it exists today.
