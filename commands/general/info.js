import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const { version } = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url)));
import Command from "../../classes/command.js";
import { exec as baseExec } from "child_process";
import { promisify } from "util";
const exec = promisify(baseExec);

class InfoCommand extends Command {
  async run() {
    const owner = await this.ipc.fetchUser(process.env.OWNER.split(",")[0]);
    const stats = await this.ipc.getStats();
    return {
      embeds: [{
        color: 16711680,
        author: {
          name: "WokeEwok Info/Credits",
          icon_url: this.client.user.avatarURL
        },
        description: `This instance is managed by **${owner.username}#${owner.discriminator}**.`,
        fields: [{
          name: "ℹ️ Version:",
          value: `v${version}${process.env.NODE_ENV === "development" ? `-dev (${(await exec("git rev-parse HEAD", { cwd: dirname(fileURLToPath(import.meta.url)) })).stdout.substring(0, 7)})` : ""}`
        },
        {
          name: "📝 Credits:",
          value: "WokeEwok is a fork of esmBot by **[Essem](https://essem.space)** and **[various contributors](https://github.com/esmBot/esmBot/graphs/contributors)**"
        },
        {
          name: "💬 Total Servers:",
          value: stats && stats.guilds ? stats.guilds : `${this.client.guilds.size} (for this cluster only)`
        },
        {
          name: "💻 Source Code:",
          value: "[Click here!](https://github.com/amirranos/WokeEwok)"
        }
        ]
      }]
    };
  }

  static description = "Gets some info and credits about me";
  static aliases = ["botinfo", "credits"];
}

export default InfoCommand;