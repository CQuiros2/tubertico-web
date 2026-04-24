import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'b1gnq59g',
  dataset: 'production',
  apiVersion: '2026-04-24',
  useCdn: true,
})
