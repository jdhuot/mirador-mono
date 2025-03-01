import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'mirador',

  projectId: '13b7dop1',
  dataset: 'production',

  // basePath: '/studio',

  // project: {
  //   basePath: '/studio'
  // },

  plugins: [structureTool(), visionTool(), codeInput()],

  studio: {
    basePath: '/',
    apiHost: 'https://miradorstudio.netlify.app',
  },

  // ✅ Force all static assets to load from the correct domain
  vite: (config) => ({
    ...config,
    base: 'https://miradorstudio.netlify.app/',
  }),

  schema: {
    types: schemaTypes,
  },
})
