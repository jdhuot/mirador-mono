// @ts-check
import { defineConfig } from 'astro/config';
import path from "path";

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    assetsInclude: ['**/*.m4v'], // Treat .m4v files as assets
  },

  adapter: netlify(),
});