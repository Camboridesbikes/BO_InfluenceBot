import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";
import { getMemberData } from "../modules/getMemberData";
import { updateMemberData } from "../modules/updateMemberData";

export const addInfluence : Command = {
  data: new SlashCommandBuilder()
    .setName("inf")
    .setDescription("Log influence add to clan.")
    .addStringOption((option) =>
        option
            .setName("amount")
            .setDescription("Influence amount")
            .setRequired(true)
    ),
    run: async(interaction) => {
        await interaction.deferReply();
        const {user, guild} = interaction;
        const member = guild?.members.fetch({user, force: true});
        const amnt : string = interaction.options.getString("amount", true)

        const targetMember = await getMemberData(user.id);
        console.log(`targetMember: ${targetMember} --> ${user.username} / id: ${user.id}`);
        const updatedMember = await updateMemberData(targetMember,  parseInt(amnt, 10));
        
        const influenceEmbed = new MessageEmbed();
        influenceEmbed.setTitle("Influence");
        influenceEmbed.setAuthor({
            name: (await member)?.nickname || user.username,
            iconURL: user.displayAvatarURL(),
        });
        influenceEmbed.addField(`Current Influence: `, updatedMember.currentInfluence.toString(), true);
        influenceEmbed.addField('Added Influence: ', amnt, true);

        await interaction.editReply({embeds: [influenceEmbed]});
    }

}