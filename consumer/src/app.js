import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import MongoDBInteraction from "./services/dbconnector/mongoDBInteraction";
import consumerQueue from "./services/consumequeueservice";

dotenv.config();

var app = express();

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
        app.use("/", (req, res, next) => {
            res.status(200).send({ message: "message from GET/POST/PUT/DELETE" });
        });
    }

    startServer() {
        MongoDBInteraction.connectToDB().then(result => {
            if(result) {
                this.listen();
            } else {
                this.startServer();
            }
        })
    }

    listen() {
        app.listen(process.env.PORT, () => {
            console.log(`Consumer is Up and Running in PORT: ${process.env.PORT}`);
        });
        this.startConsumerFunction();
    }

    startConsumerFunction() {
        consumerQueue();
    }
}

module.exports = ExpressApp;