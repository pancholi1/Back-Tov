import express from "express";
import diaryRouter from "./routes/diaries";
import login from "./routes/user";
const PORT = 3001;

const app = express();

app.use(express.json());
app.use("/create", login);
app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`e serverdsa esta corriendo en ${PORT}`);
});
