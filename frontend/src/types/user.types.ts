import { SuccessResponse } from "@/types/response.types";

export interface LeaderboardEntry {
  score: number;
  level: number;
}
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
  resetToken: string | null;
  resetTokenExpires: string | null;
  phoneNumber: string | null;
  image: string | null;
  Leaderboard: LeaderboardEntry[];
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;

export interface UpdateProfileData {
  fullName: string;
  email: string;
  password?: string;
}

export interface UserUpdateResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
  };
}
