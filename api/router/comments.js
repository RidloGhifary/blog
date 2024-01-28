import express from "express";
import { addComment, getComment } from "../controllers/comments.js";

const router = express.Router();

router.get("/:id", getComment);
router.post("/", addComment);

export default router;
