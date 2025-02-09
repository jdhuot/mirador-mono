import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'mirador',

  projectId: '13b7dop1',
  dataset: 'production',

  // project: {
  //   basePath: '/studio'
  // },

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
