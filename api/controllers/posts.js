import db from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.category
    ? `SELECT posts.id, posts.userid, posts.title, posts.description, posts.postImg, posts.date FROM posts WHERE posts.category = ? ORDER BY posts.date DESC;
    `
    : "SELECT posts.id, posts.userid, posts.title, posts.description, posts.postImg, posts.date FROM posts ORDER BY posts.date DESC";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    return res.status(200).json(data);
  });
};

export const getSinglePost = (req, res) => {
  const q = `SELECT posts.*, users.username AS writername, users.img AS writerImg FROM posts JOIN users ON users.id = posts.userid WHERE posts.id = ?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    return res.status(200).json(data[0]);
  });
};

export const addPosts = (req, res) => {
  // TODO CHECK USER WHETHER LOG IN
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid");

    const q =
      "INSERT INTO posts (`userid`, `title`, `description`, `postImg`, `date`, `category`) VALUES (?)";

    const values = [
      userInfo.id,
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.date,
      req.body.category,
    ];

    db.query(q, [values], (err, postResult) => {
      if (err) return res.status(500).json("Server Error");

      return res.status(200).json("Post Successfully");
    });
  });
};

export const editPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `description`=?, `postImg`=?, `category`=? WHERE `id`=? AND `userid` = ? ";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.category,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json("Server Error");

      return res.status(200).json("Success updated data post");
    });
  });
};

export const deletePost = (req, res) => {};
