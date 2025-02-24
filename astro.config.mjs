// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tech-station.vercel.app/',
  integrations: [
    mdx(),
    sitemap({
      site: 'https://tech-station.vercel.app/',  // Explicitly add site here
    }),
  ],
});
