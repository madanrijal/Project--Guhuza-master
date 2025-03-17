/*
  Warnings:

  - You are about to drop the column `is_superuser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FacultyUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FacultyUser" DROP CONSTRAINT "FacultyUser_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "FacultyUser" DROP CONSTRAINT "FacultyUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_invitedById_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_superuser",
ADD COLUMN     "isStaff" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSuperuser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Faculty";

-- DropTable
DROP TABLE "FacultyUser";

-- DropTable
DROP TABLE "Invitation";

-- DropEnum
DROP TYPE "Role";
