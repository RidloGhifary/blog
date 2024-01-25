import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234Ridlo",
  database: "myBlog",
});

export default db;
