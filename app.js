var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const line = require("@line/bot-sdk");

//建立資料庫連線
require("./connection/dataAccess");

// create LINE SDK config from env variables
const config = {
  channelSecret: "3be833df52c7b528c02f967616bf35a5",
};

//設定路由
var indexRouter = require("./routes/index");
var bookingRouter = require("./routes/booking");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(line.middleware(config));
app.use("/", indexRouter);
app.use("/booking", bookingRouter);

module.exports = app;
