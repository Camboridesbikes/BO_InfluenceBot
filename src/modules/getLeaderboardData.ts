import MemberModel from "../database/models/MemberModel";

export const getLeaderboardData =  async () => {
    const leaderboardData = 
        (await MemberModel.find()
            .sort({currentInfluence: -1})
            .limit(5)
        )
    
    return leaderboardData;

}