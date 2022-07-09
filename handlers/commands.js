const { getFiles } = require("../util/functions");

const fs = require("fs");
const { CommandInteractionOptionResolver } = require("discord.js");

module.exports = (bot, reload) => {
  const { client } = bot;

  fs.readdirSync("./commands/").forEach((category) => {
    let commands = getFiles(`./commands/${category}`, ".js");

    commands.forEach((fileName) => {
      const command = require(`../commands/${category}/${fileName}`);
      client.commands.set(command.name, command);
    });
  });

  console.log(`${client.commands.size} commands loaded!`);
};
