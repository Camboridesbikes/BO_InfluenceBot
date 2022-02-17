import {Client, Interaction} from "discord.js";
import { createServer } from "http2";

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

    const server = createServer((req,res) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
    })

    server.listen(process.env.PORT || 8000, () => {
        console.log('server running');
    })

    //console.log(client);

})();