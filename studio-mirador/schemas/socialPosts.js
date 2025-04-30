export default {
  name: "socialPost",
  title: "Social Post",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Post Text",
      type: "text",
      description: "Main content of the post from Buffer",
      validation: Rule => Rule.required()
    },
    {
      name: "imageUrl",
      title: "Image URL",
      type: "url"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "text",
        maxLength: 96,
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 96)
      },
      validation: Rule => Rule.required()
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: "text",
      media: "image",
      subtitle: "publishedAt"
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title?.slice(0, 60) || "Untitled",
        media,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : ""
      };
    }
  }
};
