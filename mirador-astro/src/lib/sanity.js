import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import imageUrlBuilder from '@sanity/image-url';


dotenv.config();

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // Set to false if you need fresh data every time
  apiVersion: "2024-02-01", // Use the latest API version
  // perspective: "previewDrafts",
  perspective: "published",
  token: 'skv1jftanxMMLLxkNve6OYcJPw1xVcpAnnQq3Nrb2SMvBelYgHkDWZvC33x9p0mxlIC4twvrHPGM2Knjl4PgTgkYPmLT0cVjMQEoNUZSpbeWW1cSq9Tn7YcSqixSQGaer5PXiH6bhwHFAMS40MfRQKwyIlOUdU8oRLil3Jbmf1cywvmjgxS5'
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

export async function getMagazinePage() {
  return await sanityClient.fetch(`*[_type == "magazinePage"][0]{
      ...,
      issues[]
    }`);
}

export async function getAllPosts() {
  return await sanityClient.fetch(`*[_type == "blog" && defined(slug.current)][].slug.current`);
}