import amqplib from "amqplib/callback_api";
import dotenv from "dotenv";
import calculateReward from "./calculatereward";
import MongoDBInteraction from "./dbconnector/mongoDBInteraction";

dotenv.config();

const QUEUE_NAME = process.env.QUEUE_NAME;
const URL = process.env.QUEUE_URL;
let channel = null;

amqplib.connect(URL, (error, conn) => {
    conn.createChannel((error, chan) => {
        channel = chan;
    })
})

export function consumerQueue() {
    channel.consume(QUEUE_NAME, (message) => {
        var result = calculateReward(message.content)
        if (MongoDBInteraction.updateUser(result)) {
            channel.ack(message);
        }
    }, { noAck: false });
}

module.exports = consumerQueue;
