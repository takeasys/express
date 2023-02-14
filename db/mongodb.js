require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;

const defaultPromoise = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const connectMongoDb = async (dbName, callback = defaultPromoise) => {
  const client = new MongoClient(uri);
  try {
    // connect to the database
    const database = client.db(dbName);
    // run the callback
    await callback(database);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

module.exports = connectMongoDb;
