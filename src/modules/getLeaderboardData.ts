import MemberModel from "../database/models/MemberModel";

export const getDailyLeaderboardData =  async () => {
    const leaderboardData = 
        (await MemberModel.find()
            .sort({currentInfluence: -1})
            .limit(5)
        )
    
    return leaderboardData;

}
export const getWeeklyLeaderboardData =  async () => {
    const leaderboardData = 
        (await MemberModel.find()
            .sort({totalInfluence: -1})
            .limit(5)
        )
    
    return leaderboardData;

}