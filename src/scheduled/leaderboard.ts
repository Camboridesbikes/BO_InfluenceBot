import { Client, TextChannel } from "discord.js";
import { IntentOptions } from "../config/IntentOptions";
import { validateEnv } from "../utils/validateEnv";
import { getLeaderboardData } from "../modules/getLeaderboardData";
import { connectDatabase } from "../database/connectDatabase";
import { onReady } from "../events/onReady";



(async () => {
    if(!validateEnv()) return;

     console.log('test 1');

    // if(!validateEnv()) return;

    // console.log('testing');

    // await connectDatabase();

    // console.log( await getLeaderboardData());



    const client = new Client({
        intents: IntentOptions
    });

    client.on("ready", async () =>{
      await onReady(client);
      await  (client.channels.cache.get(process.env.POST_CHANNEL_ID as string) as TextChannel).send('hello test');
    });

    await connectDatabase();

    await client.login(process.env.BOT_TOKEN);

   
})
