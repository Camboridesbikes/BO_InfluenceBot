import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";
import { getMemberData } from "../modules/getMemberData";
import { updateMemberData } from "../modules/updateMemberData";

export const addInfluence : Command = {
  data: new SlashCommandBuilder()
    .setName("inf")
    .setDescription("Log influence add to clan.")
    .addIntegerOption((option) =>
        option
            .setName("amount")
            .setDescription("Influence amount")
            .setRequired(true)
            
    ),
    run: async(interaction) => {

        console.log('___ interacting ___');

        await interaction.deferReply();
        const {user, guild} = interaction;
        const member = guild?.members.fetch({user, force: true});
        const amnt : number = interaction.options.getInteger("amount", true);
        
        const targetMember = await getMemberData(user.id);
        console.log(`targetMember: ${targetMember} --> ${user.username} / id: ${user.id} / currentinfluence: ${targetMember.currentDailyInfluence}`);
        const updatedMember = await updateMemberData(targetMember,  (amnt));
        
        const influenceEmbed = new MessageEmbed();
        influenceEmbed.setTitle("Influence");
        influenceEmbed.setAuthor({
            name: (await member)?.nickname || user.username,
            iconURL: user.displayAvatarURL(),
        });
        influenceEmbed.addField(`Total Influence: `, updatedMember.totalInfluence.toString(), true);
        influenceEmbed.addField('Added Influence: ', amnt.toString(), true);

        await interaction.editReply({embeds: [influenceEmbed]});
    }

}