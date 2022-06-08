const express = require("express");
const router = require("./routes/routes");
const cors = require("cors");
const db = require("./config/database")
const cookieParser = require("cookie-parser");

app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", router);

app.listen(1000);
db.sync();
