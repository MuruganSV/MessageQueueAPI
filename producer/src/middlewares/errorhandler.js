import httpStatusCodes from "../common/const";

export function errorHandler(err, req, res, next) {
    if (err) {
        let message = err.message || "unknown Server error";
        res.status(err.status || httpStatusCodes.INTERNAL_SERVER_ERROR).send({ message });
    } else {
        next();
    }
}

module.exports = errorHandler;