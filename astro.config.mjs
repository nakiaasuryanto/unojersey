import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // We'll use our own global.css
    }),
    alpinejs(),
  ],
  vite: {
    build: {
      // Ensure proper asset handling
      assetsInlineLimit: 0,
    },
    server: {
      // Allow all hosts for dev server
      allowedHosts: true,
    },
    preview: {
      // Allow specific hosts for preview server (production)
      allowedHosts: ['unojersey.com', 'www.unojersey.com', 'localhost'],
    },
  },
});
