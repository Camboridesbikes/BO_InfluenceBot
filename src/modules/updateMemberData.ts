import { MemberInt } from "../database/models/MemberModel";

export const updateMemberData = async (Member : MemberInt, currentInfluence : number, totalInfluence? : number ) => {
    console.log(`currentInfluence: ${currentInfluence} / totalInfluence: ${totalInfluence ||  Member.totalInfluence + currentInfluence}`)
    Member.totalInfluence = totalInfluence || Member.totalInfluence + currentInfluence;
    Member.currentInfluence = currentInfluence;
    Member.timestamp = Date.now();
    await Member.save();
    return Member;
}