import { play } from "../../utils/soundplayer.js";
import MusicCommand from "../../classes/musicCommand.js";

class KnockCommand extends MusicCommand {
  async run() {
    return await play(this.client, "./assets/audio/knock.ogg", this.message);
  }

  static description = "Plays the knock knock sound effect";
  static aliases = [];
}

export default KnockCommand;