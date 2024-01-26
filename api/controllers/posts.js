import db from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.category
    ? `SELECT posts.id, posts.userid, posts.title, posts.description, posts.postImg, posts.date, 
        CAST(CONCAT('[', GROUP_CONCAT(JSON_QUOTE(tags.name) SEPARATOR ','), ']') AS JSON) AS tags 
      FROM posts JOIN postTags ON posts.id = postTags.post_id JOIN tags ON postTags.tag_id = tags.id WHERE tags.name LIKE ? GROUP BY posts.id;
    `
    : "SELECT posts.id, posts.userid, posts.title, posts.description, posts.postImg, posts.date, CAST(CONCAT('[', GROUP_CONCAT(JSON_QUOTE(tags.name) SEPARATOR ','), ']') AS JSON) AS tags FROM posts JOIN postTags ON posts.id = postTags.post_id JOIN tags ON postTags.tag_id = tags.id GROUP BY posts.id";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    return res.status(200).json(data);
  });
};

export const getSinglePost = (req, res) => {};

export const addPosts = (req, res) => {};

export const editPost = (req, res) => {};

export const deletePost = (req, res) => {};
