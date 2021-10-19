import amqplib from "amqplib/callback_api";
import dotenv from "dotenv";
import calculateReward from "./calculatereward";

dotenv.config();

const QUEUE_NAME = process.env.QUEUE_NAME;
const URL = process.env.QUEUE_URL;
let channel = null;
var isRunning = false;

var value = [];

amqplib.connect(URL, (error, conn) => {
    conn.createChannel((error, chan) => {
        channel = chan;
    })
});

const interval = setInterval(() => {
    console.log("Checking the Queue");
    clearandAcknowldegeQueue();
}, 60000);

export function consumerQueue() {
    channel.consume(QUEUE_NAME, async (message) => {
        value.push([JSON.parse(message.content)[0], message ]);
    }, { noAck: false });
    clearandAcknowldegeQueue();
}

export async function clearandAcknowldegeQueue() {
    if (! isRunning) {
        var temp = value;
        if (temp.length > 0) {
            console.log("Running actions on Queue!");
            isRunning = true;
            for (let msg in temp) {
                var result = await calculateReward(temp[msg][0]);
                if (result) {
                    channel.ack(temp[msg][1]);
                    value[msg] = '-1';
                }
            }
            value = value.filter(data => {
                return data !== '-1';
            });
            isRunning = false;  
        }
    }
}

module.exports = consumerQueue;
