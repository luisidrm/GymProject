/*
  Warnings:

  - You are about to drop the column `Amount` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `Month` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "Amount",
DROP COLUMN "Month",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL;
