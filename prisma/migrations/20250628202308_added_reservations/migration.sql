-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "especial" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
