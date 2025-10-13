export default {
  name: "topics",
  title: "Topics",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional short description of the tag",
    },
  ],
};
