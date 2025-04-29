import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import imageUrlBuilder from '@sanity/image-url';


dotenv.config();

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // Set to false if you need fresh data every time
  apiVersion: "2024-02-01", // Use the latest API version
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllPosts() {
  return await sanityClient.fetch(`*[_type == "blog" && defined(slug.current)][].slug.current`);
}