/*
  Warnings:

  - Added the required column `id_centro` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TipoRol" ADD VALUE 'Dependiente';

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "id_centro" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_id_centro_fkey" FOREIGN KEY ("id_centro") REFERENCES "Centro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
