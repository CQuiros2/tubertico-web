'use client'

import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/publicacion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextValue = any[]

interface Props {
  value: PortableTextValue
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(900).auto('format').url()}
            alt={value.alt || ''}
            className="w-full rounded-xl object-cover"
            loading="lazy"
          />
        </figure>
      )
    },
  },
}

export function PortableTextContent({ value }: Props) {
  if (!value || value.length === 0) return null
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-green-dark prose-headings:font-bold prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-brand-orange prose-blockquote:text-gray-500">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
