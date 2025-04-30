export default {
  name: "socialPost",
  title: "Social Post",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Post Text",
      type: "array",
      of: [{ type: "block" }],
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
      name: "ctaLink",
      title: "CTA Link",
      type: "url",
      description: "Optional call-to-action link to accompany the post"
    },
    {
      name: "tags",
      title: "Tags",
      type: "text",
      description: "Optional tags"
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
      title: "publishedAt",
      imageUrl: "imageUrl",
      blocks: "text"
    },
    prepare({ title, imageUrl, blocks }) {
      // Extract plain text from the first block
      const block = (blocks || []).find(block => block._type === "block");
      const blockText = block
        ? block.children.map(child => child.text).join("")
        : "(No content)";
  
      return {
        title: blockText.slice(0, 60) || "(Untitled)",
        subtitle: title ? new Date(title).toLocaleDateString() : "",
        media: imageUrl
        ? () => <img src={imageUrl} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        : undefined
      };
    }
  }
};
