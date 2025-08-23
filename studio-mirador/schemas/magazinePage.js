export default {
  name: "magazinePage",
  title: "Magazine Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "eg: Interactive Magazine",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      description: "eg: The Long View",
    },
    {
      name: "issues",
      title: "Issues",
      type: "array",
      of: [
        {
          type: "object", 
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string"
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              description: "used for direct links to open issue tab",
              options: {
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
              name: "url",
              title: "Issue URL",
              type: "url"
            },
            {
              name: "image",
              title: "Image",
              description: "Used for promotional emails",
              type: "image"
            },
            {
              name: "rss",
              title: "Add to RSS",
              type: "boolean",
              description: "If true, this post will be added to the RSS and subsequently scheduled to be included in marketing emails",
              initialValue: false,
            },
            {
              name: "publishedAt",
              title: "Published At",
              type: "datetime",
              initialValue: () => new Date().toISOString(),
              validation: (Rule) => Rule.required(),
            },
          ]
        }
      ]
    },
  ],
};
