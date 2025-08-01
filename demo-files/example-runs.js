import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

export async function runApp() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // start example code here

    // end example code here
  } finally {
    await client.close();
  }
}

runApp().catch(console.dir);
