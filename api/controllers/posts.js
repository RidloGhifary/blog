import db from "../db.js";
import jwt from "jsonwebtoken";

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

export const addPosts = (req, res) => {
  // TODO CHECK USER WHETHER LOG IN
  // console.log(req.body);
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid");

    const postQuery =
      "INSERT INTO posts (`userid`, `title`, `description`, `postImg`,`date`) VALUES (?)";
    const tagQuery = "INSERT INTO tags (`name`) VALUES (?)";
    const postTagsQuery =
      "INSERT INTO postTags (`post_id`, `tag_id`) VALUES ((SELECT `id` FROM posts WHERE `userid` = ? AND `title` = ?), (SELECT `id` FROM tags WHERE `name` = ?))";

    const values = [
      userInfo.id,
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.date,
    ];

    db.query(postQuery, [values], (err, postResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error inserting into posts");
      }

      const tags = req.body.tags || [];
      // console.log({ postResult });
      if (tags.length === 0) {
        return res
          .status(200)
          .json("Successfully inserted into posts (no tags)");
      }

      const insertTagsAndPostTags = () => {
        let completedTags = 0;

        for (const tag of tags) {
          // Insert into tags
          db.query(tagQuery, [tag], (err, tagResult) => {
            if (err) {
              console.error(err);
              return res
                .status(500)
                .json(`Error inserting into tags for tag '${tag}'`);
            }

            // console.log({ tagResult });
            // Insert into postTags
            db.query(
              postTagsQuery,
              [userInfo.id, req.body.title, tag],
              (err, postTagsResult) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json("Error inserting into postTags");
                }

                completedTags++;

                if (completedTags === tags.length) {
                  // All tags have been processed
                  // console.log({ postTagsResult });
                  res
                    .status(200)
                    .json(
                      "Successfully inserted into posts, tags, and postTags"
                    );
                }
              }
            );
          });
        }
      };

      insertTagsAndPostTags();
    });
  });
};

export const editPost = (req, res) => {};

export const deletePost = (req, res) => {};
