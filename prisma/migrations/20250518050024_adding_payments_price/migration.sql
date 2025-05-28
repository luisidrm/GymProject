/*
  Warnings:

  - You are about to drop the `GymPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GymPrice";

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);
