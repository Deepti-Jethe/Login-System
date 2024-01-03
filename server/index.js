const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("./middlewares/AuthMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "loginsystem",
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Home Page</h1>");
});

app.post("/register", (req, res) => {
  const {
    username,
    mobile,
    dob,
    countryfrom,
    currentcountry,
    mothertongue,
    profession,
  } = req.body;

  db.query(
    "INSERT INTO users (username, mobile, dob, countryfrom, currentcountry, mothertongue, profession) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      username,
      mobile,
      dob,
      countryfrom,
      currentcountry,
      mothertongue,
      profession,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error registering user");
      } else {
        console.log("User registered successfully");
        res.status(200).send("User registered successfully");
      }
    }
  );
});
app.post("/generateotp", (req, res) => {
  const { mobile } = req.body;

  db.query("SELECT * FROM users WHERE mobile = ?", [mobile], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    }
    if (result.length > 0) {
      const otp = Math.floor(100000 + Math.random() * 900000);

      res.json({
        otp: otp,
      });
    } else {
      res.send({ message: "Phone number not registered!" });
    }
  });
});
app.post("/login", (req, res) => {
  const { mobile } = req.body;

  db.query("SELECT * FROM users WHERE mobile = ?", [mobile], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    }
    if (result.length > 0) {
      const accessToken = sign(
        { username: result[0].username },
        "importantsecret"
      );
      const user = result[0];
      const otp = Math.floor(100000 + Math.random() * 900000);

      res.json({
        token: accessToken,
        id: user.id,
        user: user,
        otp: otp,
      });
    } else {
      res.send({ message: "Phone number not registered!" });
    }
  });
});

app.get("/profile/:id", validateToken, (req, res) => {
  const id = req.params.id;

  try {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        const accessToken = sign(
          { username: result[0].username },
          "importantsecret"
        );

        const user = result[0];
        res.json({
          user: user,
        });
      } else {
        res.send({ message: "Profile doesn't exist!" });
      }
    });
  } catch (error) {
    console.error("Error in profile route:", error);
    res.send({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Running Server");
});
