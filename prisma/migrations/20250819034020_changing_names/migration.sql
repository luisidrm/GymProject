/*
  Warnings:

  - You are about to drop the column `id_centro` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `centroId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_id_centro_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "id_centro",
ADD COLUMN     "centroId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "Centro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
