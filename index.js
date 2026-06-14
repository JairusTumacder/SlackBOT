require("dotenv").config();

const axios = require("axios")

//Testing for Axios Version
// console.log("Axios Version: ", axios.VERSION);

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

app.command("/ts-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
Tech:
/ts-ping - Check bot latency
Religion:
/ts-bvotd - Generates a Bible verse of the day
Entertainment:
/ts-catfact - Generates a random cat fact
/ts-joke - Generates a random programming joke`
  });
});

app.command("/ts-catfact", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond ({ text: `Cat Fact:\n${response.data.fact}`});
  } catch (err){
    await respond ({ text: "Failed to fetch a cat fact."})
  }
});

app.command("/ts-bvotd", async ({ ack, respond }) => {
  await ack();

  try{
    const response = await axios.get("https://beta.ourmanna.com/api/v1/get?format=text&order=daily");
    await respond ({ text: `Bible Verse of the Day:\n${response.data}`});
  } catch (err){
    await respond ({ text: "Failed to fetch a Bible verse of the day."})
  }
});

app.command("/ts-joke", async ({ ack, respond }) => {
  await ack();

  try{
    const response = await axios.get("https://official-joke-api.appspot.com/jokes/random")
    await respond ({ text: `${response.data.type}\n${response.data.setup}\n${response.data.punchline}`});
  } catch (err) {
    await respond ({ text: "Failed to fetch ten random jokes."})
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
