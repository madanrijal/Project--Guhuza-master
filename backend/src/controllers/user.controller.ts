import { ZodError } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { getHashedPassword, validatePassword } from "../utils/password";
import { frontendUrl, jwtSecret, nodeEnv, resetPasswordUrl } from "../config";
import { sendOtpEmail, sendResetPasswordLink } from "../utils/mailer";
import * as response from "../utils/response";
import * as schema from "../schema/user.schema";
import * as generator from "../utils/generator";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = schema.registerSchema.parse(req.body);
    const exists = await userService.getUserByEmail(data.email);
    if (exists)
      return response.errorResponse(
        res,
        "User with this email already exists."
      );
    const otp = generator.otpGenerator();
    const user = await userService.register({
      ...data,
      otp,
    });
    sendOtpEmail(user.email, otp);
    return response.successResponse(
      res,
      "User registered successfully. Please verify your email address.",
      {
        id: user.id,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = schema.loginSchema.parse(req.body);
  try {
    const user = await userService.getUserByEmail(data.email);
    if (!user) {
      return response.errorResponse(res, "User not found.");
    }
    const isValid = await validatePassword(data.password, user.password);
    if (!isValid) {
      return response.errorResponse(res, "Invalid password.");
    }
    if (!user.isVerified) {
      return response.errorResponse(res, "Please verify your email address.");
    }
    const token = generator.generateJwt(user.email, user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: nodeEnv === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    return response.successResponse(res, "User logged in successfully.", {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    return response.successResponse(res, "User logged out successfully.");
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = schema.forgotPasswordSchema.parse(req.body);
    const user = await userService.getUserByEmail(data.email);
    if (!user) {
      return response.errorResponse(res, "User not found", null, 404);
    }
    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret as string,
      { expiresIn: "1h" }
    );
    await userService.update(user.id, {
      resetToken,
      resetTokenExpires: new Date(Date.now() + 3600000),
    });
    const resetUrl = `${resetPasswordUrl}?token=${resetToken}`;
    sendResetPasswordLink(data.email, resetUrl);
    return response.successResponse(res, "Password reset link sent to email.");
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = schema.setNewPasswordSchema.parse(req.body);
    let payload;
    try {
      payload = jwt.verify(data.token, jwtSecret as string) as {
        id: string;
        email: string;
      };
    } catch (err) {
      return response.errorResponse(res, "Invalid or expired token", null, 400);
    }
    const user = await userService.getUserById(payload.id);
    if (!user || user.email !== payload.email) {
      return response.errorResponse(
        res,
        "Invalid token. User does not exist",
        null,
        400
      );
    }
    if (user.resetToken !== data.token) {
      return response.errorResponse(res, "Invalid token", null, 400);
    }
    if (
      user.resetTokenExpires &&
      new Date() > new Date(user.resetTokenExpires)
    ) {
      return response.errorResponse(res, "Token expired", null, 400);
    }
    await userService.update(user.id, {
      password: await getHashedPassword(data.newPassword),
      resetToken: null,
      resetTokenExpires: null,
    });
    return response.successResponse(res, "Password reset successful");
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = schema.verifyUserSchema.parse(req.body);
    const { email, otp } = data;
    const user = await userService.getUserWithEmailAndOtp(email, otp);
    if (!user || user.otp !== otp) {
      return response.errorResponse(res, "Invalid email or OTP", null, 400);
    }
    await userService.update(user.id, {
      isVerified: true,
      otp: null,
    });
    return response.successResponse(res, "User verified successfully.");
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const users = await userService.getUsers(offset, Number(limit));
    return response.successResponse(res, "Users fetched successfully.", {
      users,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = schema.queryParamSchema.parse(req.params);
    const user = await userService.getUserById(data.id);
    if (!user) {
      return response.errorResponse(res, "User not found.", null, 404);
    }
    return response.successResponse(res, "User fetched successfully.", {
      user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = schema.queryParamSchema.parse(req.params);
    const data = schema.userUpdateSchema.parse(req.body);
    const user = await userService.getUserById(query.id);
    if (!user) {
      return response.errorResponse(res, "User not found.", null, 404);
    }
    if (data.email) {
      const exists = await userService.getUserByEmail(data.email);

      if (exists && exists.id !== query.id) {
        return response.errorResponse(res, "User with this email already exists.");
      }
    }
    const updated = await userService.update(req.params.id, data);
    return response.successResponse(res, "User updated successfully.", {
      id: updated.id,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return response.errorResponse(res, "Email already taken", null, 400);
    }
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = schema.queryParamSchema.parse(req.params);
    const user = await userService.getUserById(query.id);
    if (!user) {
      return response.errorResponse(res, "User not found.", null, 404);
    }
    await userService.remove(query.id);
    return response.successResponse(res, "User deleted successfully.");
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as JwtPayload).user.id;
    if (!userId) {
      return response.errorResponse(res, "User not found.", null, 404);
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return response.errorResponse(res, "User not found.", null, 404);
    }
    return response.successResponse(res, "User fetched successfully.", {
      user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};
