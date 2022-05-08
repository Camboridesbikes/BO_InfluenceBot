import MemberModel from "../database/models/MemberModel"

export const getMemberData = async(id : string) => {
    const memberData = 
    (await MemberModel.findOne({discordId: id})) ||
    (await MemberModel.create({
        discordId: id,
        totalInfluence: 0,
        currentWeeklyInfluence: 0,
        currentDailyInfluence: 0,
        timestamp: Date.now(),
    }))
    return memberData;
}