import amqp from "amqplib/callback_api";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.QUEUE_URL;
let channel = null;

amqp.connect(URL, (err, conn) => {
    conn.createChannel((err, chan) => {
        channel = chan;
    })
})

export const publishToQueue = async (queueName, data) => {
    var myData = [data];
    var d = new Buffer.from(JSON.stringify(myData));
    return new Promise((resolve, reject) => {
        try {
            channel.sendToQueue(queueName, d);
            resolve(true);
        } catch(error) {
            console.log(error);
            resolve(false);
        } 
    });           
}

module.exports = publishToQueue;