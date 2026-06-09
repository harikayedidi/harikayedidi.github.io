# Harika Yedidi Portfolio Repository

This repository now serves the modern React portfolio directly from the root URL.

## What Changed

- The modern app source remains in `modern-portfolio/`.
- The old handcrafted static site was moved into `legacy-site/`.
- Root `index.html` is now the built output of the modern app.
- Legacy site is exposed at `old-website.html`.

## Repository Structure

- `index.html`: Built modern portfolio entry (default site)
- `assets/`: Built modern portfolio static assets
- `modern-portfolio/`: Active React + Vite portfolio app
- `legacy-site/`: Archived legacy static website (`index.html`, `assets/`, `robots.txt`)
- `old-website.html`: Root entry point for the legacy website

## Run The Modern Portfolio

```bash
cd modern-portfolio
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build The Modern Portfolio

```bash
cd modern-portfolio
npm run build
```

To publish the modern build at root, copy output from `modern-portfolio/dist/` to repository root (`index.html` and `assets/`).

## Preview Production Build

```bash
cd modern-portfolio
npm run preview
```

## Legacy Website

The previous website is available at `/old-website.html` and sources are under `legacy-site/`.
