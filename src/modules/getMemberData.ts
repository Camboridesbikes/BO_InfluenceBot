import MemberModel from "../database/models/MemberModel"

export const getMemberData = async(id : string) => {
    const memberData = 
    (await MemberModel.findOne({discordId: {id}})) ||
    (await MemberModel.create({
        discordId: id,
        totalInfluence: 0,
        currentInfluence: 0,
        timestamp: Date.now(),
    }))
    return memberData;
}