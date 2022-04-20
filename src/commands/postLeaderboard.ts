import { Client, Guild, MessageEmbed, TextChannel } from "discord.js"
import { resetDailyInfluence, resetWeeklyInfluence } from "../modules/resetMemberInfluence";
import { MemberInt } from "../database/models/MemberModel";
import { getDailyLeaderboardData, getWeeklyLeaderboardData } from "../modules/getLeaderboardData";

export const postLeaderboardDaily = async (client : Client) => {

    const data = await getDailyLeaderboardData() as MemberInt [];
    console.log(`postLeaderboard data: ${data}`);
    const guild =  await (client.guilds.fetch(process.env.GUILD_ID as string)) as Guild;  

    const member = async (id : string) => {
        const user = await client.users.fetch(id);
      const guildMember = await guild.members.fetch({user});
        console.log(`name: ${guildMember.nickname || user.username}`);
      return (guildMember.nickname || user.username) as string;
    } 

    const message = new MessageEmbed();

    message.setTitle('Daily Leaderboard');

    
    Promise.all(
    data.map(async (userData, i) => {
            const name = await member(userData.discordId)
            message.addField(`${i+1}.`, name , true);
            message.addField('influence', userData.currentInfluence.toString(), true);
            message.addField('\u200b', '\u200b', false)

    })).then( async () => {
        await (client.channels.cache.get(process.env.POST_CHANNEL_ID as string) as TextChannel).send({embeds: [ message]})
    }).then(async () => await resetDailyInfluence())
    

    
}

export const postLeaderboardWeekly = async (client : Client) => {
    const data = await getWeeklyLeaderboardData() as MemberInt [];
    const guild =  await (client.guilds.fetch(process.env.GUILD_ID as string)) as Guild;
    
    const member = async (id : string) => {
        const user = await client.users.fetch(id);
      const guildMember = await guild.members.fetch({user});
        console.log(`name: ${guildMember.nickname || user.username}`);
      return (guildMember.nickname || user.username) as string;
    } 

    const message = new MessageEmbed();

    message.setTitle('Weekly Leaderboard');

    
    Promise.all(
    data.map(async (userData, i) => {
            const name = await member(userData.discordId)
            message.addField(`${i+1}.`, name , true);
            console.log
            message.addField('influence', userData.totalInfluence.toString(), true);
            message.addField('\u200b', '\u200b', false)

    })).then( async () => {
        await (client.channels.cache.get(process.env.POST_CHANNEL_ID as string) as TextChannel).send({embeds: [ message]})
    }).then(async () => await resetWeeklyInfluence())

}