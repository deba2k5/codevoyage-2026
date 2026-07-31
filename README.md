# CodeVoyage — Avengers-Themed Esports Hackathon Platform

**CodeVoyage** is a high-energy, multi-paged hackathon web application built with an aggressive "Marvel Rivals" esports aesthetic. Designed to engage participants with vibrant hero themes, dynamic slants, interactive carousel navigation, and smooth Framer Motion transitions.

---

## Features

- **Marvel Rivals Esports Aesthetic**: High-energy design using diagonal `clip-path` shapes, high contrast dark backgrounds (`#1a1b26`), lightning yellow (`#fde047`), and neon cyan accents.
- **Interactive Character Carousel**: Sleek, slanted character cards with real-time hero stage updates on hover and click.
- **Personalized Subpages**: Dynamic pages for each hero (Spider-Man, Iron Man, Captain America, Thor, Hulk) featuring custom color schemes across all hackathon sections.
- **Full Hackathon Landing Sections**:
  - **Mission Briefing**: Hackathon objectives and developer arsenal.
  - **Operation Timeline**: 3-day hackathon event schedule.
  - **Bounties**: Cash prizes and sponsorship awards.
  - **Join The Initiative**: Interactive registration form.
- **Custom Design System & Typography**: Powered by Google Fonts (`Teko` for italic headers & `Outfit` for body copy) paired with unskewed card content wrappers.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Modules with CSS Variables & `clip-path` geometry

---

## Getting Started

### Prerequisites

Ensure you have **Bun** installed on your system:
```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iemaserver/codevoyage-website.git
   cd codevoyage-website
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Development

Run the local development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build and test the production bundle:
```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```text
codevoyage-website/
├── app/
│   ├── characters/
│   │   └── [id]/              # Dynamic hero landing pages
│   │       ├── page.tsx
│   │       └── CharacterPage.module.css
│   ├── components/
│   │   ├── CharacterCarousel.tsx
│   │   └── CharacterCarousel.module.css
│   ├── data/
│   │   └── characters.ts      # Hero data, palettes & theme colors
│   ├── globals.css            # Design tokens & color system
│   ├── Home.module.css        # Homepage layout & esports slants
│   ├── layout.tsx             # Root layout & font configurations
│   └── page.tsx               # Main hero section & character stage
├── public/                    # Static assets & images
└── README.md
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
