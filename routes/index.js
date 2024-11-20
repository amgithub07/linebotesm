var express = require("express");
var router = express.Router();
const line = require("@line/bot-sdk");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Line Bot 配置
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
// router.use(line.middleware(config));
// router.post("/callback", (req, res) => {
//   console.log("amber hello");
//   Promise.all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(504).end();
//     });
// });
router.post("/callback", line.middleware(config), async (req, res) => {
  try {
    const results = await Promise.all(req.body.events.map(handleEvent));
    res.json(results);
  } catch (err) {
    console.error("Error handling events:", err);
    res.status(500).end();
  }
});

// event handler
function handleEvent(event) {
  console.log(event);
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
