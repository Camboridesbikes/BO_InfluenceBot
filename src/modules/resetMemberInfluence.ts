import MemberModel from "../database/models/MemberModel"

export const resetWeeklyInfluence = async () => {
    await MemberModel.updateMany({},{'currentInfluence' : 0, 'totalInfluence' : 0} )
}

export const resetDailyInfluence = async () => {
    await MemberModel.updateMany({},{'currentInfluence' : 0} )
}