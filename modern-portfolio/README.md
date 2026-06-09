# Modern Portfolio (React + Vite)

This is the active portfolio application for Harika Yedidi.

## Features

- Explorer View and Resume Mode toggle
- Interactive career roadmap with animated lane and car navigation
- Expandable experience cards and detailed role highlights
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- Motion / Framer Motion
- CSS

## Development

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Notes

- This app is the default website served at `https://harikayedidi.github.io/`.
- Build artifacts are published from `dist/` to repository root (`../index.html` and `../assets/`).
- The legacy static website is available at `../old-website.html` and stored in `../legacy-site/`.

## Publish To Root (GitHub Pages)

After building, copy the generated files to the repo root:

```bash
npm run build
cp dist/index.html ../index.html
rm -rf ../assets
cp -R dist/assets ../assets
```
