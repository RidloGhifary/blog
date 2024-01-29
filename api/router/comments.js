import express from "express";
import {
  addComment,
  getComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/:id", getComment);
router.post("/", addComment);
router.delete("/:id", deleteComment);

export default router;
