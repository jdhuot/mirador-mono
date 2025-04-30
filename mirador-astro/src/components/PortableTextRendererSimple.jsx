import { PortableText } from "@portabletext/react";

const components = {
  types: {
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

export default function PortableTextRendererSimple({ content }) {
  return <PortableText value={content} components={components} />;
}
