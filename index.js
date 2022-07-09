const Discord = require("discord.js");
require("dotenv").config();

const appId = process.env.APP_ID;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client,
  prefix: "n.",
  owners: [appId],
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);

client.loadEvents(bot, false);

module.exports = bot;

// client.on("ready", () => { console.log(`Logged in as ${client.user.tag}!`);
// });

// client.login(process.env.TOKEN);

// client.on("messageCreate", (message) => {
//   if (message.content === "ping") {
//     message.reply("pong");
//   }
// });

// // 새로  채널에 사람  들어오면
// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache
//     .get(welcomeChammelId)
//     .send(`Welcome to the server, ${member}`);
// });
