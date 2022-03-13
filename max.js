require("dotenv").config();
const { Client, Intents } = require("discord.js");
const commandHandler = require("./commands");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ["CHANNEL"],
});

console.log("Woof!");

client.login(process.env.BOTTOKEN);

client.on("ready", () => {
  console.log("🐕");
});

client.on("messageCreate", commandHandler);
