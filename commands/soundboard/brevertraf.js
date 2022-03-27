// shoutouts to dairyorange, you're a real one
import { play } from "../../utils/soundplayer.js";
import MusicCommand from "../../classes/musicCommand.js";

class BreverTrafCommand extends MusicCommand {
  async run() {
    return await play(this.client, "./assets/audio/2traf.ogg", this.message);
  }

  static description = "brever artxe htiw tceffe dnuos traf a syalP";
  static aliases = ["2traf"];
}

export default BreverTrafCommand;