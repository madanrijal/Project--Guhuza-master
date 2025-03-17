import { ZodError } from "zod";
import * as response from "../utils/response";
import * as schema from "../schema/quiz.schema";
import { NextFunction, Request, Response } from "express";
import * as quizService from "../services/quiz.service";
import { queryParamSchema } from "../schema/user.schema";
import { JwtPayload } from "jsonwebtoken";

export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const leaderboard = await quizService.getLeaderboard();
    return response.successResponse(res, "Leaderboard fetched successfully.", {
      leaderboard,
    });
  } catch (error) {
    next(error);
  }
};

export const createLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as JwtPayload).user?.id;
    if (!userId) {
      return response.errorResponse(res, "User not found.", null, 404);
    }

    const existingLeaderboard = await quizService.getLeaderboardByUserId(
      userId
    );

    const validatedData = schema.leaderboardSchema.parse({
      ...req.body,
      userId,
    });

    const { score, startTime, endTime, level } = validatedData;
    const start = new Date(Number(startTime));
    const end = new Date(Number(endTime));

    if (start >= end) {
      return response.errorResponse(
        res,
        "Start time must be earlier than end time.",
        null,
        400
      );
    }

    const leaderboardData = {
      userId,
      score,
      level,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      duration: (end.getTime() - start.getTime()).toString(),
    };

    if (existingLeaderboard.length > 0) {
      const updatedLeaderboard = await quizService.updateLeaderboard(
        existingLeaderboard[0].id,
        leaderboardData
      );
      return response.successResponse(
        res,
        "Leaderboard updated successfully.",
        { leaderboard: updatedLeaderboard }
      );
    }

    const leaderboard = await quizService.createLeaderboard(leaderboardData);
    return response.successResponse(res, "Leaderboard created successfully.", {
      leaderboard,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const updateLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as JwtPayload).user?.id;
    if (!userId) {
      return response.errorResponse(res, "User not found.", null, 404);
    }

    const existingLeaderboard = await quizService.getLeaderboardByUserId(
      userId
    );

    const validatedData = schema.updateLeaderboardSchema.parse({
      ...req.body,
      userId,
    });

    const { score, startTime, endTime, level } = validatedData;
    const start = new Date(Number(startTime));
    const end = new Date(Number(endTime));

    if (start >= end) {
      return response.errorResponse(
        res,
        "Start time must be earlier than end time.",
        null,
        400
      );
    }

    const leaderboardData = {
      userId,
      score,
      level,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      duration: (end.getTime() - start.getTime()).toString(),
    };

    let leaderboard;
    if (existingLeaderboard.length > 0) {
      leaderboard = await quizService.updateLeaderboard(
        existingLeaderboard[0].id,
        leaderboardData
      );
      return response.successResponse(
        res,
        "Leaderboard updated successfully.",
        { leaderboard }
      );
    } else {
      leaderboard = await quizService.createLeaderboard(leaderboardData);
      return response.successResponse(
        res,
        "Leaderboard created successfully.",
        { leaderboard }
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const deleteLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = queryParamSchema.parse(req.params);
    const leaderboard = await quizService.deleteLeaderboard(data.id);
    return response.successResponse(res, "Leaderboard deleted successfully.", {
      leaderboard,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};
