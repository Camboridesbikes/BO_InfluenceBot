import MemberModel from "../database/models/MemberModel"

export const resetWeeklyInfluence = async () => {
    await MemberModel.updateMany({},{'currentDailyInfluence' : 0, 'currentWeeklyInfluence' : 0} )
}

export const resetDailyInfluence = async () => {
    await MemberModel.updateMany({},{'currentDailyInfluence' : 0} )
}