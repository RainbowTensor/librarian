import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

const db_name = process.env.DB_NAME;
let _db;

class LibraryDAO {
    static async injectDB(conn) {
        if (_db) {
            return;
        }
        try {
            _db = await conn.db(db_name);
            console.log("Successfully connected to MongoDB.");
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${err}`
            );
        }
    }
    async get(collectionName) {
        const collection = await _db.collection(collectionName);
        let result;
        try {
            result = await collection.find({}).toArray();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
    async post(collectionName, data) {
        const collection = await _db.collection(collectionName);
        let result;
        try {
            result = await collection.insertOne(data);
        } catch (err) {
            console.error(err);
        }
        return result;
    }
    async put(collectionName, data, id) {
        if (data._id) {
            delete data._id;
        }
        const collection = await _db.collection(collectionName);
        const query = { _id: ObjectId(id) };
        const update = { $set: data };
        let result;
        try {
            result = await collection.updateOne(query, update);
        } catch (err) {
            console.error(err);
        }
        return result;
    }
    async delete(collectionName, id) {
        const collection = await _db.collection(collectionName);
        const query = { _id: ObjectId(id) };
        let result;
        try {
            result = await collection.deleteOne(query);
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

export default LibraryDAO;
