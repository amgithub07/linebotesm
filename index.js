"use strict";

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

  //我要預約
  if (reqText == "我要預約") {
    respObj = { type: "text", text: "您好~您的預約成功囉!" };
  }

  if (reqText == "場館資訊") {
    respObj = {
      type: "flex",
      altText: reqText,
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "https://line.me/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "瑪爾斯全方位運動空間",
              weight: "bold",
              size: "md",
            },
            {
              type: "box",
              layout: "baseline",
              margin: "md",
              contents: [
                {
                  type: "icon",
                  size: "sm",
                  url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                },
                {
                  type: "icon",
                  size: "sm",
                  url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                },
                {
                  type: "text",
                  text: "5.0",
                  size: "sm",
                  color: "#999999",
                  margin: "md",
                  flex: 0,
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "地址",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 5,
                      text: "24145新北市三重區三和路三段40號3樓",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "電話",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 1,
                    },
                    {
                      type: "text",
                      text: "0988-123123",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 5,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    };
  }

  if (reqText == "課程介紹") {
    respObj = {
      type: "carousel",
      contents: [
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://line.me/",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "彼拉提斯全器械 團體課程",
                weight: "bold",
                size: "md",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "text",
                    text: "5.0",
                    size: "sm",
                    color: "#999999",
                    margin: "md",
                    flex: 0,
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                        text: "11月彼拉提斯全方位器械小團班/私人課 平日班、假日班、孕婦專班 現正開放預約體驗！！",
                      },
                    ],
                  },
                  {
                    type: "text",
                    text: "#器械彼拉提斯",
                    size: "sm",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "#最懂妳的全方位運動空間",
                    size: "sm",
                    color: "#666666",
                  },
                  {
                    type: "text",
                    text: "#瑪爾斯全方位運動空間",
                    size: "sm",
                    color: "#666666",
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "了解更多",
                  text: "了解更多",
                },
                style: "link",
              },
            ],
          },
        },
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://line.me/",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "TRX懸吊流動瑜珈",
                weight: "bold",
                size: "md",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "text",
                    text: "5.0",
                    size: "sm",
                    color: "#999999",
                    margin: "md",
                    flex: 0,
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                        text: "Mandy老師",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "了解更多",
                  text: "了解更多",
                },
                style: "link",
              },
            ],
          },
        },
        {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
              type: "uri",
              uri: "https://line.me/",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "空中瑜珈",
                weight: "bold",
                size: "md",
              },
              {
                type: "box",
                layout: "baseline",
                margin: "md",
                contents: [
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "icon",
                    size: "sm",
                    url: "https://developers-resource.landpress.line.me/fx/img/review_gold_star_28.png",
                  },
                  {
                    type: "text",
                    text: "5.0",
                    size: "sm",
                    color: "#999999",
                    margin: "md",
                    flex: 0,
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 5,
                        text: "Ashley老師",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "message",
                  label: "了解更多",
                  text: "了解更多",
                },
                style: "link",
              },
            ],
          },
        },
      ],
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
