import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const Login = (req, res) => {
  // TODO CHECK WHETHER EMAIL AND PASSWORD EXIST/*style*/`
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json("Server Error");
    if (data.length === 0) return res.status(404).json("User not found");

    // TODO CHECK WHETHER PASSWORD IS CORRECT
    const isPasswordTrue = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordTrue) return res.status(400).json("Password is incorrect");

    // TODO CREATE JSON WEB TOKEN FOR AUTHENTICATION
    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const { password, ...others } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const Logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logout");
};
