import db from "../db.js";
import jwt from "jsonwebtoken";

export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      console.error(err);
      res.status(401).json("Token is not valid");
    }

    const q =
      "INSERT INTO comments(`commentId`,`comment`,`commentDate`,`userIdComment`) VALUES (?)";

    const values = [
      req.body.commentId,
      req.body.comment,
      req.body.commentDate,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        // console.error(err);
        return res.status(500).json("Server Error");
      }
      // console.log(data);
      return res.status(200).json("Add Comment Success ");
    });
  });
};

export const getComment = (req, res) => {
  const q =
    "SELECT comments.*, users.username, users.img, users.id FROM comments JOIN users WHERE userIdComment = users.id AND commentId = ? ORDER BY comments.commentDate DESC";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      // console.log(err);
      return res.status(500).json("Server Error");
    }

    // const { password, ...others } = data;
    // console.log(data);
    return res.status(200).json(data);
  });
};
