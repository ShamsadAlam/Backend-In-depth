import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello, This is Shamsad Alam</h1>");
});

app.listen(port, () => {
  console.log(`server is connected on port ${port}`);
});
