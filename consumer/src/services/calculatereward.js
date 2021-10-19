import MongoDBInteraction from "./dbconnector/mongoDBInteraction";

const rewardScore = 0.3;

export async function calculateReward(message) {
    var { cid, info } = message;
    var { rewardCalculate, purchaseAmount, currentPurchaseDate } = info;
    var RewardPoints = 0;
    if (rewardCalculate) {
        RewardPoints = (purchaseAmount * rewardScore) / 10;
    } else {
        RewardPoints = (purchaseAmount / 100) * rewardScore;
    }

    var result = { cid, RewardPoints, currentPurchaseDate };
    return new Promise(async (resolve, reject) => {
        await MongoDBInteraction.updateUser(result).then(resp => {
            if (resp) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = calculateReward;