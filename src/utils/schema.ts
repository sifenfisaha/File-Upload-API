import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const FileIdParamSchema = z.object({
  id: z.string().length(24, { message: "Invalid blog ID" }),
});
