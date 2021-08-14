const paginator = require("../../utils/pagination/pagination.js");
const { searx } = require("../../servers.json");
const { random } = require("../../utils/misc.js");
const fetch = require("node-fetch");
const Command = require("../../classes/command.js");

class ImageSearchCommand extends Command {
  async run() {
    if (this.message.channel.guild && !this.message.channel.permissionsOf(this.client.user.id).has("addReactions")) return "I don't have the `Add Reactions` permission!";
    if (this.message.channel.guild && !this.message.channel.permissionsOf(this.client.user.id).has("embedLinks")) return "I don't have the `Embed Links` permission!";
    if (this.args.length === 0) return "You need to provide something to search for!";
    this.client.sendChannelTyping(this.message.channel.id);
    const embeds = [];
    const rawImages = await fetch(`${random(searx)}/search?format=json&safesearch=2&categories=images&q=!goi%20!bii%20!ddi%20${encodeURIComponent(this.args.join(" "))}`).then(res => res.json());
    if (rawImages.results.length === 0) return "I couldn't find any results!";
    const images = rawImages.results.filter((val) => !val.img_src.startsWith("data:image"));
    for (const [i, value] of images.entries()) {
      embeds.push({
        "embed": {
          "title": "Search Results",
          "color": 16711680,
          "footer": {
            "text": `Page ${i + 1} of ${images.length}`
          },
          "description": value.title,
          "image": {
            "url": encodeURI(value.img_src)
          },
          "author": {
            "name": this.message.author.username,
            "icon_url": this.message.author.avatarURL
          }
        }
      });
    }
    return paginator(this.client, this.message, embeds);
  }

  static description = "Searches for images across the web";
  static aliases = ["im", "photo", "img"];
  static arguments = ["[query]"];
}

module.exports = ImageSearchCommand;