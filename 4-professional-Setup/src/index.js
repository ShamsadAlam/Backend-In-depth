/*
-> first method- Write All DB Connections in a single 'index.js' file
-> DB Connection using IIFE

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();

*/

// Second method-> make seperae-te connection of Database
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/dbConnect.js";
import app from "./app.js";
const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB DB Connection Failed !!", err);
  });
