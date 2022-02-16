import MemberModel from "../database/models/MemberModel";

export const getLeaderboardData = async () => {
    const leaderboardData = 
        (await MemberModel.find()
            .sort({currentInfluence: -1})
            .limit(5)
            .exec((err, docs) => {console.log(err)})
        )

    console.log(leaderboardData)   

}