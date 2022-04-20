import {Client} from "discord.js";
import {Agenda} from 'agenda'

import {defineJobs, runJobs} from "./scheduling/defineJobs"
import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { onReady } from "./events/onReady";
import {validateEnv} from "./utils/validateEnv";
import {handleInteraction} from "./handlers/interaction";

(async () => { 
    if(!validateEnv()) return; //checks that environmental variables != null

    await connectDatabase();

    const agenda = new Agenda({db: {address: (process.env.MONGODB_URI as string)}});

    const client = new Client({
        intents: IntentOptions
    });

    await defineJobs(agenda, client); 
    
   
    
    client.on("interactionCreate", handleInteraction);

    client.on("ready", async () => {
        await onReady(client);
        
    })

    client.on("runJob", async () => await runJobs(agenda));

    

    await client.login(process.env.BOT_TOKEN);

    

})();
