import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config();

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, // Set to false if you need fresh data every time
  apiVersion: "2024-02-01", // Use the latest API version
  perspective: "published",
});