import {Client, Interaction} from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import {validateEnv} from "./utils/validateEnv";

(async () => {
    if(!validateEnv()) return;

    const client = new Client({
        intents: IntentOptions
    });

    client.on("ready", async () => {
        await onReady(client);
    })

    client.on("interactionCreate", 
        async(interaction : Interaction) => await onInteraction(interaction)
    )

    await connectDatabase();

    await client.login(process.env.BOT_TOKEN);

    //console.log(client);

})();