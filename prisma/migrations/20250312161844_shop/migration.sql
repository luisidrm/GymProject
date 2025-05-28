-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "compra" DOUBLE PRECISION,
    "venta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_nombre_key" ON "Shop"("nombre");
