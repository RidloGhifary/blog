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

export const getSinglePost = (req, res) => {
  const q = `SELECT posts.id, posts.userid, posts.title, posts.description, posts.postImg, posts.date,  users.username AS writername, users.img AS writerImg,
        CAST(CONCAT('[', GROUP_CONCAT(JSON_QUOTE(tags.name) SEPARATOR ','), ']') AS JSON) AS tags 
      FROM posts JOIN postTags ON posts.id = postTags.post_id JOIN tags ON postTags.tag_id = tags.id JOIN users ON users.id = posts.userId WHERE posts.id = ? GROUP BY posts.id`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    return res.status(200).json(data[0]);
  });
};

export const addPosts = (req, res) => {};

export const editPost = (req, res) => {};

export const deletePost = (req, res) => {};
