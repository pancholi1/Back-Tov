import express from "express";
// import { getEntries } from "../servicies/diaryServices";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

async function main() {
  let formulario: Prisma.FormularioCreateInput;

  formulario = {
    pregunta: "Tu nombre es francisco ?",
    respuestas: {
      create: { bio: "asd?" },
    },
  };

  await prisma.formulario.create({ data: formulario });
}

const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers["token"] as string;
  if (!token) throw new Error("Invalid token");
  let user = jwt.verify(token, "secreto");
  if (!user) throw new Error("Usuario inválido");

  const respuesta = main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  console.log("cargo");
  res.send(respuesta);
});
router.post("/", (_req, res) => {
  res.send("saving");
});

export default router;
