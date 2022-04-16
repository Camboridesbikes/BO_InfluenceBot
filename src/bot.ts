import {Client, Interaction} from "discord.js";
import {Agenda} from 'agenda'

import {defineJobs, runJobs} from "./scheduling/defineJobs"
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onReady } from "./events/onReady";
import {validateEnv} from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";

(async () => {
    if(!validateEnv()) return;

    await connectDatabase();

    const agenda = new Agenda({db: {address: (process.env.MONGODB_URI as string)}});

    const client = new Client({
        intents: IntentOptions
    });

    await defineJobs(agenda, client);   
    
    client.on("interactionCreate", 
        async(interaction : Interaction) => await onInteraction(interaction)
    )

    client.on("ready", async () => {
        await onReady(client);
        
        await runJobs(agenda);
        
    })

    

    await client.login(process.env.BOT_TOKEN);

    

})();
