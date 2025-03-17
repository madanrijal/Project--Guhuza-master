import axios from "axios";
import { Question } from "../routes/question.route";
import type { LeaderboardResponse, QuizResponse } from "@/types/quiz.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getQuestions = async (level: number) => {
  const res = await axios.get(Question.get(level));
  return res.data as QuizResponse;
};

export const getLeaderboard = async () => {
  const res = await axios.get("http://localhost:5000/api/leaderboard/");
  return res.data as LeaderboardResponse;
};

export const createLeaderboardEntry = async (data: {
  score: number;
  startTime: string;
  endTime: string;
  level: number;
}) => {
  await axios.post(
    "http://localhost:5000/api/leaderboard/",
    {
      score: data.score,
      startTime: data.startTime.toString(),
      endTime: data.endTime.toString(),
      level: data.level,
    },
    {
      withCredentials: true,
    }
  );
};

export const useGetQuestions = (level = 1) => {
  return useQuery({
    queryKey: ["questions", level],
    queryFn: () => getQuestions(level),
  });
};

export const useGetLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });
};

export const useCreateLeaderboardEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLeaderboardEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
