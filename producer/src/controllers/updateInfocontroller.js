import httpStatusCodes from "../common/const";
import publishToQueue  from "../services/queueservice";
import dotenv from "dotenv";

dotenv.config();

const QUEUE_NAME = process.env.QUEUE_NAME;

export class UpdateInfoController {
    constructor() {}

    updateInfotoQueue (req, res, next) {
        delete req.body.authToken;
        publishToQueue(QUEUE_NAME, req.body).then((result) => {
            if(result) {
                res.status(httpStatusCodes.OK).send({ updatetoQueue: "Success" });
            } else {
                res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Can't update Queue, error occured" });
            }
        });
    }

}

module.exports = new UpdateInfoController();