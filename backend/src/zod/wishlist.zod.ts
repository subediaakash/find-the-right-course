import { z } from "zod";
export const addWishlistSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Invalid URL format"),
  imageUrl: z.string().url("Invalid image URL format"),
  platform: z.enum(["UDEMY", "YOUTUBE", "COURSERA"] as const),
});
