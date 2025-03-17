/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Invitation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "expiredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "facultyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_superuser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FacultyUser" (
    "id" SERIAL NOT NULL,
    "facultyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacultyUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyUser" ADD CONSTRAINT "FacultyUser_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyUser" ADD CONSTRAINT "FacultyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
