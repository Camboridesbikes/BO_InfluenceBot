import {Agenda} from 'agenda'
import {Client} from "discord.js";
import { postLeaderboardDaily, postLeaderboardWeekly } from "../commands/postLeaderboard";

export const defineJobs = async (agendaInstance : Agenda, client : Client)  => { 
    agendaInstance.define("post daily leaderboard", async () => await postLeaderboardDaily(client))
    agendaInstance.define("post weekly leaderboard", async () => await postLeaderboardWeekly(client))
    agendaInstance.define("testPing", () => console.log("agenda ping"))

}

export const runJobs = async (agenda : Agenda) => { 
    agenda.on('ready', async () => {

        console.log('sgarting agenda')
        await agenda.start();
        //run every day at 10am london time
        await agenda.every("0 10 * * *","post daily leaderboard", {timezone : "Europe/London"} );
        //run every monday at 10:05 london time
        await agenda.every("5 10 * * 1","post weekly leaderboard", {timezone : "Europe/London"} );
        await agenda.schedule("in 15 seconds", "testPing", {timezone : "Europe/London"});

    }).on('error', () => console.log("Agenda Connection Error!"))
}

