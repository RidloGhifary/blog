import express from "express";
import authRouter from "./router/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server Connected");
});

app.listen(4000, () => {
  console.log("Server Connected");
});
