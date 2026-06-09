# Harika Yedidi Portfolio

This repository contains two portfolio experiences:

1. `index.html` based handcrafted site (legacy/static)
2. `modern-portfolio/` React + Vite app (interactive modern experience)

## Project Layout

- `index.html`: Legacy portfolio homepage
- `assets/`: Legacy CSS, JS, fonts, and images
- `modern-portfolio/`: Modern React app source

## Modern Portfolio Features

- Dual mode UI:
	- Explorer View
	- Resume Mode
- Interactive "Career Roadmap" section with clickable mile markers
- Animated lane and car movement across experience milestones
- Responsive layout for desktop and mobile

## Run the Modern App

From the repository root:

```bash
cd modern-portfolio
npm install
npm run dev
```

Default local URL:

- `http://localhost:5173`

## Build

```bash
cd modern-portfolio
npm run build
```

## Preview Production Build

```bash
cd modern-portfolio
npm run preview
```

## Deploy Notes

- The legacy static site can be served directly from repository root.
- The modern app outputs production files to `modern-portfolio/dist/`.

## Tech Stack (Modern App)

- React
- Vite
- Motion / Framer Motion
- CSS
