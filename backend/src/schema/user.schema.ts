import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  otp: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userUpdateSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  password: z.string().min(8).optional(),
  image: z.string().nullable().optional(),
  otp: z.string().nullable().optional(),
  isVerified: z.boolean().optional(),
  resetToken: z.string().nullable().optional(),
  resetTokenExpires: z.date().nullable().optional(),
  role: z.enum(["USER", "ADMIN", "MODERATOR", "SUPERUSER"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});

export const verifyUserSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const setNewPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

export const queryParamSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
export type VerifyUserData = z.infer<typeof verifyUserSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type SetNewPasswordData = z.infer<typeof setNewPasswordSchema>;
export type QueryParamData = z.infer<typeof queryParamSchema>;
