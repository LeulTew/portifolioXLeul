<div align="center">

# PortifolioX

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, performant portfolio built with React 19, TypeScript, and View Transitions API.

[Mobile Portfolio X](https://leul-t-agonafer-x.vercel.app) | [Desktop Portfolio](https://leul-t-agonafer.vercel.app) | [Report Bug](https://github.com/LeulTew/portifolioXLeul/issues)

</div>

---

## Features

- **View Transitions API** - Smooth page transitions with morphing animations
- **Dark/Light Mode** - Instant theme switching with localStorage persistence
- **Responsive Design** - Seamless experience across all devices
- **EmailJS Integration** - Contact form with direct email delivery
- **Performance Optimized** - WebP images, lazy loading, code splitting
- **100% TypeScript** - Full type safety across the codebase
- **93%+ Test Coverage** - Comprehensive test suite with Vitest

## Tech Stack

| Category       | Technologies                        |
| -------------- | ----------------------------------- |
| **Frontend**   | React 19, TypeScript, TailwindCSS 3 |
| **Build Tool** | Vite 7 with Rolldown, Bun 1.4.0     |
| **Testing**    | Vitest, React Testing Library       |
| **Icons**      | Lucide React                        |
| **Email**      | EmailJS                             |
| **Deployment** | Vercel                              |

## Quick Start

```bash
# Clone repository
git clone https://github.com/LeulTew/portifolioXLeul.git
cd portifolioXLeul

# Install dependencies
bun install --frozen-lockfile

# Create environment file
cp .env.example .env
# Add your EmailJS credentials to .env

# Start development server
bun run dev
```

## Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `bun run dev`           | Start development server |
| `bun run build`         | Type-check and build for production |
| `bun run preview`       | Preview production build |
| `bun run lint`          | Run ESLint               |
| `bun run test`          | Run tests                |
| `bun run test:coverage` | Run tests with coverage  |

## Production routing and deployment

Phones use `https://leul-t-agonafer-x.vercel.app`; desktops and tablets use
`https://leul-t-agonafer.vercel.app`. The lightweight entry module checks the device
before importing React, application CSS, or the portfolio app. It uses
`location.replace` to change only the origin, preserving the path, query, and
fragment. Old production aliases also redirect to the appropriate canonical site.

Phone detection uses iPhone, iPod, Windows Phone, or Android Mobile user agents,
with `navigator.userAgentData.mobile === true` as a fallback. Explicit iPad/Tablet
agents and iPadOS desktop-style agents (`Macintosh` with multiple touch points)
are tablets, even if a mobile client hint is present. Window width, resizing, and
touch support alone never trigger routing. No query override or persistent
redirect preference is used. Both repositories must keep this policy in sync to
avoid cross-site loops.

Only the explicitly listed production hosts in `src/lib/deviceRouting.ts` route
between sites. Localhost, custom domains, and Vercel preview URLs render normally
for development and review.

Vercel uses the committed `vercel.json`: Vite,
`bunx bun@1.4.0 install --frozen-lockfile`, `bunx bun@1.4.0 run build`, and output
directory `dist`. The commands explicitly select Bun 1.4.0 because Vercel's
preinstalled Bun may not support this lockfile format; `packageManager` alone
does not select the hosted runtime. This follows
[Vercel's Bun version-pinning guidance](https://vercel.com/kb/guide/how-to-pin-a-specific-bun-version-for-vercel-builds).
`bun.lock` remains the sole dependency lockfile. The SPA rewrite serves
`index.html` for application paths while existing static assets remain available.
Configure both canonical and legacy aliases on their respective Vercel projects;
source routing does not create domains or deployments. Preserve the project's
existing EmailJS environment settings when deploying.

## Project Structure

```
src/
├── components/
│   ├── views/           # Page components
│   │   ├── Home.tsx
│   │   ├── Work.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── ProjectDetail.tsx
│   ├── Dock.tsx         # Navigation dock
│   └── MainStage.tsx    # View container
├── data/
│   ├── projects.ts      # Project data
│   └── cv.ts           # Personal info
└── types.ts            # TypeScript types
```

## Browser Support

| Browser     | View Transitions         |
| ----------- | ------------------------ |
| Chrome 111+ | Full support             |
| Edge 111+   | Full support             |
| Firefox     | Fallback (no animations) |
| Safari      | Fallback (no animations) |

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

Made by **Leul Tewodros**

[![GitHub](https://img.shields.io/badge/GitHub-LeulTew-181717?style=flat-square&logo=github)](https://github.com/LeulTew)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Leul_Tewodros-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/leul-tewodros/)
[![Telegram](https://img.shields.io/badge/Telegram-@fabbin-26A5E4?style=flat-square&logo=telegram)](https://t.me/fabbin)

</div>
