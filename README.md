<div align="center">

# PortifolioX

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, performant portfolio built with React 19, TypeScript, and View Transitions API.

[Live Demo](https://portifoliox.vercel.app) | [Report Bug](https://github.com/LeulTew/portifolioXLeul/issues)

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
| **Frontend**   | React 19, TypeScript, TailwindCSS 4 |
| **Build Tool** | Vite 6 with Rolldown                |
| **Testing**    | Vitest, React Testing Library       |
| **Icons**      | Lucide React                        |
| **Email**      | EmailJS                             |
| **Deployment** | Vercel                              |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone repository
git clone https://github.com/LeulTew/portifolioXLeul.git
cd portifolioXLeul

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env` file with your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get your credentials at [EmailJS](https://www.emailjs.com).

## Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start development server |
| `pnpm build`         | Build for production     |
| `pnpm preview`       | Preview production build |
| `pnpm lint`          | Run ESLint               |
| `pnpm test`          | Run tests                |
| `pnpm test:coverage` | Run tests with coverage  |

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

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LeulTew/portifolioXLeul)

1. Import repository to Vercel
2. Add environment variables
3. Deploy

### Manual Build

```bash
pnpm build
# Serve dist/ folder with any static host
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
