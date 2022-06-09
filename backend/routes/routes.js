const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const mysql = require("mysql");
// const UserModel = require("../models/user");
const db = require("../config/database");
const jwt = require("jsonwebtoken");

// Connect to user account MySQL database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "grabportallogin",
// });

// http://localhost:8080/api/login
router.post("/login", function (req, res) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Retrive user data
    return db
      .query("SELECT * FROM accounts WHERE username = '" + username + "'", {
        type: db.QueryTypes.SELECT,
      })
      .then((result) => {
        // No result is found
        if (result.length === 0) {
          return res.status(404).send({ message: "User Not Found" });
        } else if (result.length > 0 && result[0].password === password) {
          // Signed using secret key
          const token = jwt.sign({ id: result[0].username }, "secret");
          // Store token as cookie
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 10 * 1000,
          });
          res.send({ message: "success" });
        } else {
          res.status(403).send({ message: "Incorrect password" });
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
  try {
    const claims = jwt.verify(cookie, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    } else {
      return db
        .query("SELECT * FROM accounts WHERE username = '" + claims.id + "'", {
          type: db.QueryTypes.SELECT,
        })
        .then((result) => {
          // res.send(result[0].username);
          return res.send({
            message: "authenticated",
            user: result,
          });
        });
    }
  } catch {
    return res.send({
      message: "JWT is not provided",
    });
  }
});

// http://localhost:1000/logout
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Logout Success",
  });
});

module.exports = router;
