/*
  Warnings:

  - You are about to drop the `Formulario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Respuestas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Respuestas" DROP CONSTRAINT "Respuestas_preguntasId_fkey";

-- DropTable
DROP TABLE "Formulario";

-- DropTable
DROP TABLE "Respuestas";

-- CreateTable
CREATE TABLE "TestChaside" (
    "id" SERIAL NOT NULL,
    "hability" TEXT,
    "interest" TEXT,
    "userId" INTEGER,

    CONSTRAINT "TestChaside_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestChaside" ADD CONSTRAINT "TestChaside_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
