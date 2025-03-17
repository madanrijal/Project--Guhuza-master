import { z } from "zod";
export const leaderboardSchema = z.object({
  userId: z.string().uuid("Invalid UUID format"),
  score: z.number().int().min(0, "Score must be a positive number"),
  level: z.number().int().min(0, "Level must be a positive number"),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.string().optional(),
});

export const updateLeaderboardSchema = z.object({
  score: z.number().int().min(0, "Score must be a positive number"),
  level: z.number().int().min(0, "Level must be a positive number"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.string().optional(),
});

export type LeaderboardData = z.infer<typeof leaderboardSchema>;
export type UpdateLeaderboardData = z.infer<typeof updateLeaderboardSchema>;
