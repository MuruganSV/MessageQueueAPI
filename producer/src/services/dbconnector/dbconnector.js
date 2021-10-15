import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bx3j2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const DB_COLLECTION = process.env.DB_COLLECTION_NAME;
const DB_NAME = process.env.DB_NAME;

class DbInteraction {
    client = null;
    db = null;
    constructor() {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connectToDB() {
        console.log("Connecting to MongoDB...");
        return new Promise((res, rej) => {
            this.client.connect((err, db) => {
                // this.collection = this.mongClient.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION_NAME}`);
                if(!err) {
                    this.db = db.db(DB_NAME);
                    console.log("Sucessfully Connected to MongoDB!!!");
                    res(true);
                } else {
                    console.log("Cannot connect to MongoDB, Please Check DB Configuration, trying to connect again!");
                    res(false);
                }
            });
        });
    }
 
    checkUserExists(cid) {
        return this.db.collection(DB_COLLECTION).findOne({ cid }).then(data => {
            if (data) {
                return true;
            }
            return false;
        });
    }
}

module.exports = new DbInteraction();