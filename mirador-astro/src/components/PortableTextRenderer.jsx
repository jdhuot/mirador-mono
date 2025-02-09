import { PortableText } from "@portabletext/react";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.url) {
        console.error("Missing image asset:", value);
        return null;
      }
      return (
        <img
          src={value.url}
          alt={value.alt || "Blog Image"}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
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
