import { type } from "os";
import { MemberInt } from "../database/models/MemberModel";

type reset = 'daily' | 'weekly'

export const updateMemberData = async (Member : MemberInt, addedInfluence : number, influenceReset? : reset  ) => {
    if(influenceReset != undefined){
        if(influenceReset == 'daily'){
            Member.currentInfluence = 0;
        }
        else if(influenceReset == 'weekly'){
            Member.currentInfluence = 0;
            Member.totalInfluence = 0;
        }
    }else{
        Member.totalInfluence += addedInfluence;
        Member.currentInfluence += addedInfluence;
    }
    
    Member.timestamp = Date.now();
    await Member.save();
    return Member;
}