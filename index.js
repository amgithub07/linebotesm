'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  //channelSecret: process.env.CHANNEL_SECRET,
  channelSecret: '3be833df52c7b528c02f967616bf35a5',
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  //channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
  channelAccessToken: 'KanK50RucvNsPt0FwPN38Is6mIF3RyTrQ+Ngw6BffEU83XPeuk6vaJvBO8YtdSsXq7d69/ipGTkj7JzZE25tuf1NPbibykwU1Otqpl3/BAAzRWoR0OrRQ26rH6vWwSKKRyuas2X8vLvbuIF8cApwKwdB04t89/1O/w1cDnyilFU='
});

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/hello', function(req, res, next) {
  res.send('Hello word');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create an echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
