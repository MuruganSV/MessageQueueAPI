import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes";
import errorHandler  from "./middlewares/errorhandler";
import dotenv from "dotenv";
import DbInteraction from "./services/dbconnector/dbconnector";

dotenv.config();

const app = express();

export class ExpressApp {
    constructor() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use((req,res,next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.options("**", (req, res, next) => {
            res.status(200).send({ message: "we will serve you!" });
        });
        app.use(errorHandler);
        app.use("/", router);
    }

    startServer() {
        DbInteraction.connectToDB().then(result => {
            if(result) {
                this.listen();
            } else {
                this.startServer();
            }
        });
    }

    listen() {
        app.listen(process.env.PORT, () => {
            console.log(`Producer is Up and Running on PORT: ${process.env.PORT}`);
        });
    }
}

module.exports = ExpressApp;