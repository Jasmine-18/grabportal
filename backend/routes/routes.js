const router = require("express").Router();
const userDB = require("../config/userDB");
const grabDB = require("../config/grabDB");
const jwt = require("jsonwebtoken");
const paginate = require("jw-paginate");

// http://localhost:8080/api/login
router.post("/login", function (req, res, next) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Retrive user data
    return userDB
      .query("SELECT * FROM accounts WHERE username = '" + username + "'", {
        type: userDB.QueryTypes.SELECT,
      })
      .then((result) => {
        // No result is found
        if (result.length === 0) {
          return res.status(404).send({ message: "User Not Found" });
        } else if (result.length > 0 && result[0].password === password) {
          // Signed using secret key
          const token = jwt.sign({ id: result[0].username }, "secret", {
            expiresIn: "2h", // expires in 2 hours
          });
          res.send({ message: "success", token: token });
        } else {
          res.status(403).send({ message: "Incorrect password" });
        }
      });
  } else {
    res.send({
      message: "Please enter Username and Password!",
    });
    next();
  }
});

// http://localhost:8080/api/auth
router.get("/auth", (req, res) => {
  const token = req.headers["authorization"];
  try {
    const claims = jwt.verify(token, "secret");
    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    } else {
      return userDB
        .query("SELECT * FROM accounts WHERE username = '" + claims.id + "'", {
          type: userDB.QueryTypes.SELECT,
        })
        .then((result) => {
          return res.send({
            user: claims.id,
            message: "authenticated",
          });
        });
    }
  } catch (e) {
    return res.status(401).send({
      message: e,
    });
  }
});

// http://localhost:1000/api/logout
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "Logout Success",
  });
});

// http://localhost:1000/api/db
router.post("/db", (req, res) => {
  return grabDB
    .query("SELECT * FROM transactions WHERE id<200", {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      res.send(result);
    });
});

// http://localhost:1000/api/history/todayTransaction
router.post("/history/todayTransaction", (req, res) => {
  return grabDB
    .query("SELECT * FROM transactions WHERE created_at LIKE '2021-03-30%'", {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      res.send(result);
    });
});
// http://localhost:1000/api/dashboard/totalFilter
router.post("/dashboard/totalFilter", (req, res) => {
  let queryResult = [];
  let dateFilter = req.body.dateFilter;
  let denoFilter = req.body.denoFilter;
  let statusFilter = req.body.statusFilter;
  let totalPayoutQuery =
    "SELECT SUM(amount_total) AS totalPayout FROM transactions WHERE";
  let totalCustomerQuery =
    "SELECT COUNT(DISTINCT user_email) AS totalCustomer FROM transactions WHERE";
  let totalTransactionQuery =
    "SELECT COUNT(*) AS totalTransaction FROM transactions WHERE";
  // date filter is required for every query
  if (dateFilter) {
    totalPayoutQuery += " created_at LIKE '" + dateFilter + "%'";
    totalCustomerQuery += " created_at LIKE '" + dateFilter + "%'";
    totalTransactionQuery += " created_at LIKE '" + dateFilter + "%'";
  }
  if (denoFilter) {
    totalPayoutQuery += " AND amount_value = '" + denoFilter + "'";
    totalCustomerQuery += " AND amount_value = '" + denoFilter + "'";
    totalTransactionQuery += " AND amount_value = '" + denoFilter + "'";
  }
  if (statusFilter) {
    totalPayoutQuery += " AND status= '" + statusFilter + "'";
    totalCustomerQuery += " AND status= '" + statusFilter + "'";
    totalTransactionQuery += " AND status= '" + statusFilter + "'";
  }

  grabDB
    .query(totalTransactionQuery, {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      queryResult[0] = result[0];
    });
  grabDB
    .query(totalPayoutQuery, {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      queryResult[1] = result[0];
    });
  grabDB
    .query(totalCustomerQuery, {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      queryResult[2] = result[0];
      res.send(queryResult);
    });
});

// http://localhost:1000/api/history/filterTransaction
router.post("/history/filterTransaction", (req, res) => {
  let dateFilter = req.body.transactionDate;
  let userEmailFilter = req.body.userEmail;
  let userPhoneFilter = req.body.dateFilter;
  let denoFilter = req.body.amount;
  let statusFilter = req.body.status;
  let dataQuery = "SELECT * FROM transactions WHERE";
  // date filter is required for every query
  if (dateFilter) {
    dataQuery += " created_at LIKE '%" + dateFilter + "%'";
  }
  if (userEmailFilter) {
    dataQuery += " AND user_email LIKE '%" + userEmailFilter + "%'";
  }
  if (userPhoneFilter) {
    dataQuery += " AND user_phone LIKE '%" + userPhoneFilter + "%'";
  }
  if (denoFilter) {
    dataQuery += " AND amount_value = '" + denoFilter + "'";
  }
  if (statusFilter) {
    dataQuery += " AND status LIKE '%" + statusFilter + "%'";
  }
  grabDB
    .query(dataQuery, {
      type: userDB.QueryTypes.SELECT,
    })
    .then((result) => {
      res.send(result);
    });
});

// http://localhost:1000/api/
router.post("/dataToday", (req, res) => {
  return grabDB
    .query(
      "SELECT SUM(amount_total) FROM transactions WHERE created_at LIKE '2021-03-30%'",
      {
        type: userDB.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      res.send(result);
    });
});

// paged items route
router.get("/items/:page/", async (req, res, next) => {
  // example array of 150 items to be paged
  let items = [];
  // var result = [];
  // var keys = Object.keys(json);

  await grabDB
    .query("SELECT * FROM transactions WHERE created_at LIKE '2021-03-30%'", {
      type: userDB.QueryTypes.SELECT,
    })
    .then((response) => {
      // keys = Object.keys(response);
      items = Object.entries(response);
    });

  // get page from query params or default to first page
  const page = parseInt(req.params.page) || 1;

  // get pager object for specified page
  const pageSize = 2;
  const pager = paginate(items.length, page, pageSize);

  // get page of items from items array
  const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
  // console.log(pageOfItems[0][1])

  // return pager object and current page of items
  return res.send({ pager, pageOfItems });
});

module.exports = router;
