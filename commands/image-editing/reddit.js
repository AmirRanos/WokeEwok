import ImageCommand from "../../classes/imageCommand.js";
import { random } from "../../utils/misc.js";
const names = ["formula1", "Minecraft", "me_irl", "dankmemes", "hmmm", "gaming", "wholesome", "chonkers", "memes", "funny", "pcmasterrace"];

class RedditCommand extends ImageCommand {
  params() {
    return {
      caption: this.args.length === 0 ? random(names) : this.args.join(" ").replaceAll("\n", "").replaceAll(" ", "")
    };
  }

  static description = "Adds a Reddit watermark to an image";
  static arguments = ["{text}"];

  static noText = "You need to provide some text to add a Reddit watermark!";
  static command = "reddit";
}

export default RedditCommand;
