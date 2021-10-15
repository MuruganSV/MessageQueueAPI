import httpStatusCodes from "../common/const";
import DbInteraction from "../services/dbconnector/dbconnector";
import dotenv from "dotenv";

dotenv.config();

const AUTH_TOKEN = process.env.AUTH_TOKEN;

export function checkAuthandUser(req, res, next) {
    let authToken = req.body.authToken;
    if (! authToken || authToken !== AUTH_TOKEN) {
        res.status(httpStatusCodes.BAD_REQUEST).send({ error: "BadRequest Error" });
    }

    if (DbInteraction.checkUserExists(req.body.cid)) {
        next();
    } else {
        res.status(httpStatusCodes.NOT_FOUND).send({ error: "User Not Found!" });
    }
}

module.exports = checkAuthandUser;