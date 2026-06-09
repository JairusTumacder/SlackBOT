require("dotenv").config();

const axios = require("axios")

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/ts-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/dsb-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/ts-ping - Check bot latency`
  });
});



(async () => {
  await app.start();
  console.log("bot is running!");
})();
