-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "id_ciente" INTEGER NOT NULL,
    "Month" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymPrice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GymPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_id_ciente_fkey" FOREIGN KEY ("id_ciente") REFERENCES "Clientes"("id_ciente") ON DELETE RESTRICT ON UPDATE CASCADE;
