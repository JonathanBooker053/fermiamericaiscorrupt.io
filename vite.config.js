import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const network = process.env.NETWORK || 'fermi';

export default defineConfig({
  plugins: [react()],
  define: {
    __NETWORK__: JSON.stringify(network),
  },
  base: `/${network}/`,
  build: {
    outDir: `dist/${network}`,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
  },
});
