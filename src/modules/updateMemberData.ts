import { MemberInt } from "../database/models/MemberModel";

export const updateMemberData = async (Member : MemberInt, influence : number) => {
    Member.totalInfluence += influence;
    Member.currentInfluence += influence;
    Member.timestamp = Date.now();
    await Member.save();
    return Member;
}