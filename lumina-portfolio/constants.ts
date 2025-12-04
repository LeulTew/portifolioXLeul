import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Portifolio Leul',
    category: 'React & Framer Motion',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    description: 'The current immersive portfolio you are experiencing. Built with React 19, Experimental View Transitions API, and Tailwind CSS. It challenges traditional web navigation by treating the viewport as a single, fluid cinematic stage.',
  },
  {
    id: 'p2',
    title: 'E-Commerce API',
    category: 'Node.js & Microservices',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop',
    description: 'A robust backend infrastructure for high-volume retail. Features a microservices architecture using Node.js, Express, and Docker. Implements Redis caching, Stripe payment integration, and real-time inventory tracking via WebSockets.',
  },
  {
    id: 'p3',
    title: 'TaskMaster AI',
    category: 'Next.js & OpenAI',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2670&auto=format&fit=crop',
    description: 'A smart project management tool that uses LLMs to automatically break down complex project descriptions into actionable tasks. Built with Next.js 14, TypeScript, and Prisma with a PostgreSQL database.',
  },
  {
    id: 'p4',
    title: 'Addis Estate',
    category: 'Full Stack Real Estate',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
    description: 'A property listing platform tailored for the Ethiopian market. Features interactive map search, virtual tours, and a secure booking system. Tech stack includes React, Firebase, and Google Maps API.',
  },
];