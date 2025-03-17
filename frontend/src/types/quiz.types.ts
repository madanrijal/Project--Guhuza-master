import { SuccessResponse } from "@/types/response.types";

export type QuizResponse = SuccessResponse<{
  questions: Questions;
}>;

export interface Questions {
  test_group: number;
  question: Question[];
}

export interface Question {
  question: string;
  comment: string;
  test_answer: number;
  answers: string[];
}

export type LeaderboardResponse = SuccessResponse<{
  leaderboard: Leaderboard[];
}>;

export interface LeaderboardData {
  leaderboard: Leaderboard[];
}

export interface Leaderboard {
  id: string;
  user: User;
  score: number;
  duration: string;
  level: number;
}

export interface User {
  fullName: string;
  email: string;
}
