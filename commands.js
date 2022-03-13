const clubbot = require("./commands/clubbot.js");
const help = require("./commands/help.js");

const commands = { clubbot, help };

module.exports = async function (msg) {
  let tokens = msg.content;
  if (tokens.length > 0) {
    tokens = tokens.replace(/["“”]+/g, '"');
    tokens = tokens.replace(/[,]+/g, " ");
    tokens = tokens.match(/(?:[^\s"]+|"[^"]*")+/g);
    let command = "";
    if (tokens) {
      command = tokens.shift();
    }
    if (command.charAt(0) === "!") {
      command = command.substring(1);
      let server = "DM";
      if (msg.guild) {
        server = msg.guild.name;
      }
      if (command in commands) {
        console.log(command, tokens, msg.author.username, "@", server);
        commands[command](msg, tokens);
      }
    }
  }
};
