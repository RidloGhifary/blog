import express from "express";
import authRouter from "./router/auth.js";
import postsRouter from "./router/posts.js";
import commentsRouter from "./router/comments.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/publicAssets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  res.status(200).json(req.file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.get("/", (req, res) => {
  res.send("Server Connected");
});

app.listen(4000, () => {
  console.log("Server Connected");
});
