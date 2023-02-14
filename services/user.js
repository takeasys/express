var { ObjectId } = require("mongodb");
const connectMongoDb = require("../db/mongodb");

class UserService {
  constructor() {
    this.db = "demo";
    this.collection = "users";
  }

  async getUser(userData) {
    let user;
    await connectMongoDb(this.db, async (db) => {
      try {
        const collection = await db.collection(this.collection);
        user = await collection.findOne(userData);
      } catch (err) {
        console.log("==== UserService error ====", err);
      }
    });
    return user;
  }

  async getUserById(userId) {
    return await this.getUser({ _id: ObjectId(userId) });
  }

  async getUserByUsername(username) {
    return await this.getUser({ username });
  }

  async getUsers() {
    let results = [];
    await connectMongoDb(this.db, async (db) => {
      try {
        const collection = await db.collection(this.collection);
        results = await collection.find({}).toArray();
      } catch (err) {
        console.log("==== UserService error ====", err);
      }
    });
    return results;
  }

  async addUser(user) {
    let userId;
    await connectMongoDb(this.db, async (db) => {
      try {
        // get the collection
        const collection = await db.collection(this.collection);

        // ensure the index exists
        collection.createIndex({ username: 1 }, { unique: true });

        // insert the user
        const insertedId = await collection.insertOne(user);

        // return the id
        userId = insertedId;
      } catch (err) {
        console.log("==== UserService error ====", err);
      }
    });
    return userId;
  }
}

module.exports = new UserService();
