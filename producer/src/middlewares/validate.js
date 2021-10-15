import schema from "../common/schema";
import httpStatusCodes from "../common/const";


export function validate(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        res.status(httpStatusCodes.BAD_REQUEST).send({ error: "Invalid Request body!" });
    } else {
        next();
    }
}

module.exports = validate;
