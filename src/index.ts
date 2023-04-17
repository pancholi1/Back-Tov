import express from "express";

import chaside from "./routes/chaside";
import login from "./routes/user";
const PORT = 3001;

const app = express();

app.use(express.json());
app.use("/", login);
app.use("/testChaside", chaside);

app.listen(PORT, () => {
  console.log(`El server corre enn ${PORT}`);
});
