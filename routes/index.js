var express = require("express");
var router = express.Router();
const line = require("@line/bot-sdk");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// create LINE SDK config from env variables
const config = {
  channelSecret: "3be833df52c7b528c02f967616bf35a5",
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken:
    "4oc/ISDnGEz58zWSteJ2PBkVJ7Nwvxh8M+bDxTJGxFxL/uRGyKYBtI4ExKOTmXlrq7d69/ipGTkj7JzZE25tuf1NPbibykwU1Otqpl3/BADcvAJsl/U8zQHA7LYsmAKBBrnPnVaUtddC9Q9wIBRqYAdB04t89/1O/w1cDnyilFU=",
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
router.post("/callback", line.middleware(config), (req, res) => {
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

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [respObj],
  });
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.post("/", async function (req, res, next) {
//   try {
//     const result = await postsModel.create(req.body);
//     http.success(res, "新增貼文成功", result);
//   } catch (err) {
//     http.fail(res, `新增貼文失敗:${err}`);
//   }
// });

module.exports = router;
