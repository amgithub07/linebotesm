"use strict";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const classes = require("./static/課程介紹.json");
const location = require("./static/場館資訊.json");
const reservationStap1 = require("./static/預約課程日期.json");
const reservationStap2 = require("./static/預約課程時間.json");
const reservationStapSuccess = require("./static/預約成功.json");
//const reservationFail = require("./static/預約失敗.json");

//import { classes } from "./static/課程介紹";

const line = require("@line/bot-sdk");
const express = require("express");
require("dotenv").config();

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get("/hello", function (req, res, next) {
  res.send("Hello word");
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create an echoing text message
  const reqText = event.message.text;
  let respObj = { type: "text", text: reqText };

  if (reqText == "我要預約") {
    respObj = {
      type: "flex",
      altText: "我要預約",
      contents: reservationStap1,
    };
  }

  if (reqText.indexOf("預約日期") == 0) {
    respObj = {
      type: "flex",
      altText: "我要預約",
      contents: reservationStap2,
    };
  }

  if (reqText.indexOf("預約課程") == 0) {
    respObj = {
      type: "flex",
      altText: "我要預約",
      contents: reservationStapSuccess,
    };
  }

  if (reqText == "場館資訊") {
    respObj = {
      type: "flex",
      altText: "我要預約",
      contents: location,
    };
  }

  if (reqText == "課程介紹") {
    respObj = {
      type: "flex",
      altText: "我要預約",
      contents: classes,
    };
  }

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [respObj],
  });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
