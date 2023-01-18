-- CreateTable
CREATE TABLE "Respuestas" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "preguntasId" INTEGER NOT NULL,

    CONSTRAINT "Respuestas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formulario" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT,

    CONSTRAINT "Formulario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Respuestas_preguntasId_key" ON "Respuestas"("preguntasId");

-- AddForeignKey
ALTER TABLE "Respuestas" ADD CONSTRAINT "Respuestas_preguntasId_fkey" FOREIGN KEY ("preguntasId") REFERENCES "Formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
