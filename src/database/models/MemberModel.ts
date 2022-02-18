import {Document, model, Schema} from "mongoose"

export interface MemberInt extends Document{
    discordId: string;
    totalInfluence: number;
    currentInfluence: number;
    timestamp: number
}

export const Member = new Schema({
    discordId: {type: String, required: true, unique: true},
    totalInfluence: Number,
    currentInfluence: Number,
    timestamp: Number
});

export default model<MemberInt>("member", Member);