import express from "express";
import jwt_decode from "jwt-decode";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const router = express.Router();

async function main() {
  const respuesta = await prisma.user.findMany({
    include: {
      ResultChaside: true,
    },
  });
  console.log(respuesta);
  return respuesta;
}

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
  res.send(respuesta);
});

async function save(req: any, decoded: any) {
  const result = await prisma.testChaside.create({
    data: { ...req.body, userId: decoded.id },
  });
  return result;
}

router.post("/", (req, res) => {
  const token = req.headers["token"] as string;
  if (!token) throw new Error("Invalid token");
  let user = jwt.verify(token, "secreto");
  if (!user) throw new Error("Usuario inválido");
  var decoded = jwt_decode(token);
  const respuesta = save(req, decoded);

  try {
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(404).json(respuesta);
  }
});

export default router;
