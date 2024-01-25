import db from "../db.js";
import bcrypt from "bcrypt";

export const Register = (req, res) => {
  // TODO CHECK IF USER EXISTED ALREADY
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    if (data.length) return res.status(409).json("User already exist");

    // TODO HASH USER PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users (`email`, `username`, `password`) VALUES (?)";
    const values = [req.body.email, req.body.username, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Server Error");
      return res.status(200).json("User has been created");
    });
  });
};

export const Login = () => {};

export const Logout = () => {};
