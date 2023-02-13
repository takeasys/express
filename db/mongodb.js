const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI

const connectMongoDb = async (dbName, callback = () =>{}) => {
  const client = new MongoClient(uri);
  try {
    const database = client.db(dbName);

    callback(database);

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

module.exports = connectMongoDb;