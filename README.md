# Portfolio Website

A personal portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

This project showcases my profile, technical skills, selected projects, certificates, and contact links in a fast, modern, and responsive single-page experience with section-based routes.

## About This Project

- Name: Hein Htet Ko
- Role: Full Stack Web Developer (Frontend focused)
- Goal: Present production-style work, clean UX, and maintainable code structure

## Features

- Sticky section-aware navigation (`Home`, `Skills`, `Projects`, `Achievements`, `Contact`)
- Smooth scroll between sections with reduced-motion support
- Theme toggle (light/dark)
- Hero section with profile, role, resume download, and quick actions
- Interactive skills section with a client-side globe visualization
- Project cards with live demo links and tech tags
- Achievements/certificates gallery
- Contact CTA with Email, LinkedIn, and GitHub links
- Fully responsive layout (mobile to desktop)

## Tech Stack

- Framework: Next.js `16.2.2`
- UI: React `19.2.4`
- Language: TypeScript
- Styling: Tailwind CSS `v4`
- Linting: ESLint `v9`

## Project Structure

```text
src/
  app/                # Next.js app routes
  components/
    layout/           # Header, Footer, path scroll behavior
    pages/            # Portfolio page composition
    sections/         # Hero, Skills, Projects, Achievements, Contact
    skills/           # Skill icons + globe
    theme/            # Theme toggle
    ui/               # Reusable UI primitives
  content/            # Portfolio data (profile, projects, links, certificates)
  hooks/              # Visibility and motion hooks
  lib/                # Utilities (class merge, scrolling, section routes)
public/
  projects/           # Project images
  certificates/       # Certificate images
  resume.pdf          # Downloadable resume
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Build for production

```bash
npm run build
```

### 4. Start production build

```bash
npm run start
```

### 5. Lint project

```bash
npm run lint
```

## Content Editing

Most portfolio content is centralized in:

- `src/content/portfolio.ts`

Update this file to edit:

- Profile information
- Skills
- Projects
- Contact links
- Certificates

## Contact

- Email: `heinhtetko69@gmail.com`
- LinkedIn: [hein-htet-ko](https://www.linkedin.com/in/hein-htet-ko/)
- GitHub: [HeinHtetKo99](https://github.com/HeinHtetKo99)

Feel free to reach out if you'd like to collaborate or hire me.
