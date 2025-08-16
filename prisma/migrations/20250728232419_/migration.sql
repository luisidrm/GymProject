/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rol" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_nombre_key" ON "User"("nombre");
