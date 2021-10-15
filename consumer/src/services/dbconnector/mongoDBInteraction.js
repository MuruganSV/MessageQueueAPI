import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.bx3j2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const DB_COLLECTION_NAME = process.env.DB_COLLECTION_NAME;
const DB_NAME = process.env.DB_NAME;

export class MongoDBInteraction {
    client = null;
    db = null;
    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connectToDB() {
        console.log("Connecting to MongoDB...");
        return new Promise((resolve, reject) => {
            this.client.connect((error, db) => {
                if (!error) {
                    this.db = db.db(DB_NAME);
                    console.log("Successfully connected to MongoDB!!!");
                    resolve(true);
                } else {
                    console.log("Can't connect to MongoDB, trying again to connect...");
                    resolve(false);
                }
            });
        });
    }

    updateUser(data) {
        return this.db.collection(DB_COLLECTION_NAME).findOne({ "cid": data.cid }).then(resp => {
            if (resp) {
                var rewards = data.RewardPoints + resp.RewardPoints;
                return this.db.collection(DB_COLLECTION_NAME).updateOne({ "cid": data.cid },
                { $set: { "RewardPoints": rewards, "lastPurchaseDate": new Date(data.currentPurchaseDate).toISOString() } 
            }).then( res => {
                    if (res) {
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                return false;
            }
        })
    }
}

module.exports = new MongoDBInteraction();