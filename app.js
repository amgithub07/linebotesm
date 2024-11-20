var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//建立資料庫連線
require("./connection/dataAccess");

//設定路由
var indexRouter = require("./routes/index");
var bookingRouter = require("./routes/booking");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/booking", bookingRouter);

module.exports = app;
