const fetch = require("node-fetch");
const defaultGif =
  "https://tenor.com/view/jurrasic-park-samuel-l-jackson-magic-word-you-didnt-say-the-magic-work-gif-3556977";
const limit = 1;

module.exports = async function (msg, tokens) {
  try {
    let gif = defaultGif;
    let results = [];
    if (tokens.length > 0) {
      if (tokens[0] === "kahn" || tokens[0] === "madeline") {
        // Tenor random of Madeline Kahn
        results = await getTenorRandom("madeline kahn");
      } else if (tokens[0] === "brooks" || tokens[0] === "mel") {
        // Tenor random of Mel Brooks
        results = await getTenorRandom("mel brooks");
      }
    } else {
      // Tenor random of both
      let terms = ["madeline kahn", "mel brooks"];
      let index = Math.floor(Math.random() * terms.length);
      results = await getTenorRandom(terms[index]);
    }
    if (results.length > 0) {
      gif = results[0].url;
    }
    msg.channel.send(gif);
  } catch (error) {
    console.log(error);
  }
};

async function getTenorRandom(terms) {
  let apiURL = `https://g.tenor.com/v1/random?q=${terms}&key=${process.env.TENORKEY}&limit=${limit}`;
  let results = [];
  try {
    let response = await fetch(apiURL);
    let json = await response.json();
    results = json.results;
    return results;
  } catch (error) {
    console.log(error);
  }
}
