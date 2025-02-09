export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the testimonial",
    },
    {
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "Name of the person giving the testimonial",
    },
    {
      name: "video",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*", // Restrict to video files
      },
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Thumbnail to display before video plays",
    },
    {
      name: "quote",
      title: "Quote",
      type: "array",
      of: [{ type: "block" }],
      description: "Testimonial quote",
    },
    {
      name: "numberOfStars",
      title: "Number of Stars",
      type: "number",
      description: "Number of star rating to display",
    },
    {
      name: "homeOrder",
      title: "Home Order",
      type: "number",
      description: "Order of the testimonial on the home page (one is first)",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};
