import { PortableText } from "@portabletext/react";
import { urlFor } from '../lib/sanity';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.url) {
        console.error("Missing image asset:", value);
        return null;
      }
      return (
        <img
          // src={value.src}
          src={urlFor(value).width(800).format('webp').url()}
          alt={value.alt || "Blog Image"}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      );
    },
    customHTML: ({ value }) => {
      if (!value?.html) return null;
      
      return (
        <div
          dangerouslySetInnerHTML={{ __html: value.html }}
        />
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({ content }) {
  return <PortableText value={content} components={components} />;
}
