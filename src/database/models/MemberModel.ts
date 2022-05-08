import {Document, model, Schema} from "mongoose"

export interface MemberInt extends Document{
    discordId: string;
    totalInfluence: number;
    currentWeeklyInfluence: number;
    currentDailyInfluence: number;
    timestamp: number
}

export const Member = new Schema({
    discordId: String,
    totalInfluence: Number,
    currentWeeklyInfluence: Number,
    currentDailyInfluence: Number,
    timestamp: Number
});

export default model<MemberInt>("member", Member);