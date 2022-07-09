const { getFiles } = require("../util/functions");

module.exports = (bot, reload) => {
  const { client } = bot;

  let events = getFiles("./events", ".js");

  if (events.length === 0) {
    console.log("No events found!");
  }

  events.forEach((fileName, index) => {
    if (reload) delete require.cache[require.resolve(`./events/${fileName}`)];
    const event = require(`../events/${fileName}`);
    client.events.set(event.name, event);

    if (!reload)
      console.log(`${index + 1}/${events.length} ${fileName} loaded!`);
  });

  if (!reload) initEvents(bot);
};

function triggerEventHandler(bot, event, ...args) {
  const { client } = b;
  try {
    if (client.events.has(event)) {
      client.events.get(event).run(bot, ...args);
    } else {
      throw new Error(`Event ${event} not found!`);
    }
  } catch (err) {
    console.error(err);
  }
}

function initEvents(bot) {
  const { client } = bot;

  client.on("ready", () => {
    triggerEventHandler(bot, "ready");
  });
}
