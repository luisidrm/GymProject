/*
  Warnings:

  - Made the column `id_ciente` on table `Payments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_id_ciente_fkey";

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "id_ciente" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_id_ciente_fkey" FOREIGN KEY ("id_ciente") REFERENCES "Clientes"("id_ciente") ON DELETE RESTRICT ON UPDATE CASCADE;
