-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "producto" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);
