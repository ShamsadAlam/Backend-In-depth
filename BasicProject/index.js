const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/twitter", (req, res) => {
  res.send("ShamsadAlam7084");
});

app.get("/login", (req, res) => {
  res.send("<h1>Please login yourself</h1>");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
