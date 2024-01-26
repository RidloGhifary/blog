import express from "express";
import {
  addPosts,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", addPosts);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
