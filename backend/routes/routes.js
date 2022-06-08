const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// Connect to user account MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "grabportallogin",
});

// http://localhost:8080/api/login
router.post("/login", function (req, res) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  let userQuery =
    "SELECT * FROM accounts WHERE username = " + connection.escape(username);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Retrive user data
    connection.query(userQuery, function (error, results, fields) {
      if (error) throw error;
      // Ensure the username is exist and correct password
      if (results.length == 0) {
        res.status(404).send({
          message: "User not found",
        });
      } else if (results.length > 0 && password === results[0].password) {
        // Signed using secret key
        const token = jwt.sign({ id: results[0].username }, "secret");
        // Store token as cookie
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 15 * 1000,
        });
        res.send({
          message: "success",
        });
      } else {
        res.status(403).send({
          message: "Incorrect password",
        });
      }
    });
  } else {
    res.send({
      message: "Please enter Username and Password!",
    });
    res.end();
  }
});

// http://localhost:8080/api/auth
router.get("/auth", (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, "secret");
  if (!claims) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
  let userQuery =
    "SELECT * FROM accounts WHERE username = " + connection.escape(claims.id);
  connection.query(userQuery, function (error, results, fields) {
    res.send(results);
  });
});

// http://localhost:8080/logout
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Logout Success",
  });
});

module.exports = router;
