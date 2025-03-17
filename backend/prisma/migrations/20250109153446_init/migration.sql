/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'AGENT', 'ADMIN', 'SUPERUSER');

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "Follows";

-- DropEnum
DROP TYPE "UserStatus";
