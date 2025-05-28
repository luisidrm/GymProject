-- DropForeignKey
ALTER TABLE "Clientes" DROP CONSTRAINT "Clientes_id_entrenador_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_id_ciente_fkey";

-- AlterTable
ALTER TABLE "Clientes" ALTER COLUMN "id_entrenador" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "id_ciente" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_id_entrenador_fkey" FOREIGN KEY ("id_entrenador") REFERENCES "Entrenadores"("id_entrenador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_id_ciente_fkey" FOREIGN KEY ("id_ciente") REFERENCES "Clientes"("id_ciente") ON DELETE SET NULL ON UPDATE CASCADE;
