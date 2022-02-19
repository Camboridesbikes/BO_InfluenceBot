import { Client, TextChannel } from "discord.js";
import { IntentOptions } from "../config/IntentOptions";
import { validateEnv } from "../utils/validateEnv";
import { getLeaderboardData } from "../modules/getLeaderboardData";
import { connectDatabase } from "../database/connectDatabase";
import { onReady } from "../events/onReady";
import { postLeaderboardDaily } from "../commands/postLeaderboard";
import { exit } from "process";


console.log('leaderboard starting...');

(async () => {
    if(!validateEnv()) return;

     console.log('test 1'); 

    const client = new Client({
        intents: IntentOptions
    });

    await connectDatabase();

    client.once("ready", async () => {
      await onReady(client);
      await postLeaderboardDaily(client);
    });
    
    

    await client.login(process.env.BOT_TOKEN);  

   
})()
