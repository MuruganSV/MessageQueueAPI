import DateExtension from '@joi/date';
import * as JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

const schema = Joi.object({
    cid: Joi.string().min(6).required(),
    authToken: Joi.string().required(),
    info: Joi.object({
        rewardCalculate: Joi.boolean().required(),
        currentPurchaseDate: Joi.date().format('YYYY-MM-DD').required(),
        purchaseAmount: Joi.number().required(),
    }).required(),
});

module.exports = schema;