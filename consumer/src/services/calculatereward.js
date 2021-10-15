const rewardScore = 0.3;

export function calculateReward(message) {
    var { cid, info } = JSON.parse(message)[0];
    var { rewardCalculate, purchaseAmount, currentPurchaseDate } = info;
    var RewardPoints = 0;
    if (rewardCalculate) {
        RewardPoints = (purchaseAmount * rewardScore) / 10;
    } else {
        RewardPoints = (purchaseAmount / 100) * rewardScore;
    }
    return { cid, RewardPoints, currentPurchaseDate };
}

module.exports = calculateReward;