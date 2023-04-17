import express from "express";

import { createUser, login } from "../servicies/user";

const router = express.Router();

router.post("/login", async (req, res) => {
  let log = await login(req.body.email, req.body.password);
  return res.send(log);
});

router.post("/create", async (req, res) => {
  let result = await createUser(req.body);
  res.send(result);
});

export default router;
