-- CreateTable
CREATE TABLE "Entrenadores" (
    "id_entrenador" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "entrenados" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Entrenadores_pkey" PRIMARY KEY ("id_entrenador")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id_ciente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "numero_inscripcion" INTEGER NOT NULL,
    "id_entrenador" INTEGER NOT NULL,
    "plan" BOOLEAN NOT NULL,
    "telefono" TEXT,
    "picture" TEXT,
    "estado" BOOLEAN,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id_ciente")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrenadores_ci_key" ON "Entrenadores"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_ci_key" ON "Clientes"("ci");

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_id_entrenador_fkey" FOREIGN KEY ("id_entrenador") REFERENCES "Entrenadores"("id_entrenador") ON DELETE RESTRICT ON UPDATE CASCADE;
