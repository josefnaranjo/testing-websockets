const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");

const app = express();

app.use(bodyParser.json());

const pusher = new Pusher({
  appId: "YOUR_APP_ID",
  key: "YOUR_PUSHER_APP_KEY",
  secret: "YOUR_PUSHER_APP_SECRET",
  cluster: "YOUR_PUSHER_CLUSTER",
  useTLS: true,
});

app.post("/message", (req, res) => {
  const { channelName, eventName, message } = req.body;

  pusher
    .trigger(channelName, eventName, message)
    .then(() => {
      res.status(200).send("Message sent");
    })
    .catch((error) => {
      console.error("Error triggering Pusher:", error);
      res.status(500).send("Error sending message");
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
