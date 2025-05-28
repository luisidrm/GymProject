-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_id_ciente_fkey";

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "id_ciente" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_id_ciente_fkey" FOREIGN KEY ("id_ciente") REFERENCES "Clientes"("id_ciente") ON DELETE SET NULL ON UPDATE CASCADE;
