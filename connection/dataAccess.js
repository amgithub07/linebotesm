const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const dbString = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PWD
);
mongoose
  .connect(dbString)
  .then(() => console.log("資料庫連接成功"))
  .catch((err) => `資料庫連線失敗:${err}`);
