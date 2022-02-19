import {Client} from "discord.js";
import {Agenda} from 'agenda'
import { postLeaderboardDaily, postLeaderboardWeekly } from "./commands/postLeaderboard";
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onReady } from "./events/onReady";
import {validateEnv} from "./utils/validateEnv";

(async () => {
    if(!validateEnv()) return;

    await connectDatabase();

    const agenda = new Agenda({db: {address: (process.env.MONGODB_URI as string)}});

    agenda.define("post daily leaderboard", async () => await postLeaderboardDaily(client))
    agenda.define("post weekly leaderboard", async () => await postLeaderboardWeekly(client))


    const client = new Client({
        intents: IntentOptions
    });

   
    

    client.on("ready", async () => {
        await onReady(client);
        agenda.start();
        agenda.every("* 10 */1 * *","post daily leaderboard", {timezone : "Europe/London"} );
        agenda.every("* 10 * 1 *","post weekly leaderboard", {timezone : "Europe/London"} );
    })

    

    await client.login(process.env.BOT_TOKEN);

    

})();