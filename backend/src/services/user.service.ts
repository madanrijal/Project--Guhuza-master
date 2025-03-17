import prisma from "../db/prisma";
import { RegisterData, UserUpdateData } from "../schema/user.schema";
import { getHashedPassword } from "../utils/password";

export const register = async (data: RegisterData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await getHashedPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email: " + error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { // ✅ Use include instead of select for related models
        Leaderboard: {  // ✅ Match Prisma schema (Leaderboard with uppercase "L")
          select: {
            score: true,
            level: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error);
  }
};



export const getUserByToken = async (token: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by reset token: " + error);
  }
};

export const getUserWithEmailAndOtp = async (email: string, otp: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, otp },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email and OTP: " + error);
  }
};

export const getUsers = async (page: number, limit: number) => {
  try {
    return await prisma.user.findMany({
      skip: page,
      take: limit,
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching users: " + error);
  }
};

export const update = async (userId: string, data: UserUpdateData) => {
  return await prisma.user.update({ where: { id: userId }, data: data });
};

export const remove = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error("Error deleting user: " + error);
  }
};
