import { MemberInt } from "../database/models/MemberModel";

export const updateMemberData = async (Member : MemberInt, addedInfluence : number) => {
    Member.totalInfluence += addedInfluence;
    Member.currentWeeklyInfluence += addedInfluence;
    Member.currentDailyInfluence += addedInfluence;
    Member.timestamp = Date.now();
    await Member.save();
    return Member;
}