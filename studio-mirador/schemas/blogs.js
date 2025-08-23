export default {
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: input => input
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/[^\w-]+/g, "") // Remove non-word characters
        .trim()
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional subtitle",
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      description: "Main image for the blog post",
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      initialValue: () => ({ _ref: "c5a235d7-7a54-40d9-b64d-c8eea4ce1bc2" }),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      initialValue: () => ({ _ref: "c53d066f-a697-4640-a778-f4332a65175f" }),
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { 
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Alternative text for screen readers",
            }
          ]
        },
        {
          type: "object",
          name: "customHTML",
          title: "Custom HTML",
          fields: [
            {
              name: "html",
              title: "HTML Code",
              type: "text",
              description: "Enter custom HTML here (use with caution)",
            }
          ]
        }
      ],
      description: "Main blog content",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "array",
      of: [{ type: "block" }],
      description: "Short summary of the post",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "text",
    },
    {
      name: "comingSoon",
      title: "Coming Soon",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "rss",
      title: "Add to RSS",
      type: "boolean",
      description: "If true, this post will be added to the RSS and subsequently scheduled to be included in marketing emails",
      initialValue: false,
    },
  ],
};
