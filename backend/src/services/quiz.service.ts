import prisma from "../db/prisma";
import { LeaderboardData, UpdateLeaderboardData } from "../schema/quiz.schema";

export const createLeaderboard = async (data: LeaderboardData) => {
  try {
    const leaderboard = await prisma.leaderboard.create({
      data,
    });
    return leaderboard;
  } catch (error) {
    throw new Error("Error creating leaderboard: " + error);
  }
};

export const getLeaderboard = async () => {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: [{ score: "desc" }, { duration: "asc" }],
      select: {
        id: true,
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
        level: true,
        score: true,
        duration: true,
      },
    });
    return leaderboard;
  } catch (error) {
    throw new Error("Error fetching leaderboard: " + error);
  }
};

export const updateLeaderboard = async (
  id: string,
  data: UpdateLeaderboardData
) => {
  try {
    const leaderboard = await prisma.leaderboard.update({
      where: { id },
      data,
    });
    return leaderboard;
  } catch (error) {
    throw new Error("Error updating leaderboard: " + error);
  }
};

export const deleteLeaderboard = async (id: string) => {
  try {
    const leaderboard = await prisma.leaderboard.delete({
      where: { id },
    });
    return leaderboard;
  } catch (error) {
    throw new Error("Error deleting leaderboard: " + error);
  }
};

export const getLeaderboardByUserId = async (userId: string) => {
  try {
    const leaderboard = await prisma.leaderboard.findMany({
      where: { userId },
    });
    return leaderboard;
  } catch (error) {
    throw new Error("Error fetching leaderboard: " + error);
  }
};
