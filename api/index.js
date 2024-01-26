import express from "express";
import authRouter from "./router/auth.js";
import cookieParser from "cookie-parser";

const app = express();

// const middleware = (req, res, next) => {
//   if (req.cookies.access_token) {
//     res.send(res.data);
//     next();
//   } else {
//     res.send("You are not authenticated");
//   }
// };

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server Connected");
});

app.listen(4000, () => {
  console.log("Server Connected");
});
