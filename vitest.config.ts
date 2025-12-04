import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // @ts-expect-error - react plugin types mismatch
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}', 
        'src/test/**/*', 
        'src/index.tsx', 
        'src/components/MicroWidget.tsx', 
        'src/components/Sidebar.tsx', 
        'src/types.ts'
      ],
      thresholds: {
        lines: 90,
        functions: 85,
        branches: 85,
        statements: 90,
      },
    },
  },
});
