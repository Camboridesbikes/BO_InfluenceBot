import { Interaction } from "discord.js";
import { onInteraction } from "../events/onInteraction";
 
 export const handleInteraction = async (interaction : Interaction) => await onInteraction(interaction);