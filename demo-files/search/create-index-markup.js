//	:replace-start: {
//	  "terms": {
//	    "process.env.CONNECTION_STRING": "\"<connection-string>\"",
//      "export ": "",
//      "createSearchIndex": "run"
//	  }
//	}
import { MongoClient } from 'mongodb';
// :snippet-start: create-index
// :uncomment-start:
//const { MongoClient } = require("mongodb");
// :uncomment-end:

// connect to your Atlas deployment
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function createSearchIndex() {
    try {

        // set namespace
        const database = client.db("sample_mflix");
        const collection = database.collection("movies");

        // define your Atlas Search index
        const index = {
            name: "default",
            definition: {
                /* search index definition fields */
                "mappings": {
                    "dynamic": true
                }
            }
        }

        // run the helper method
        const result = await collection.createSearchIndex(index);
        console.log(result);
        return result; // :remove:
  } finally {
    await client.close();
  }
}

// :uncomment-start:
//run().catch(console.dir);
// :uncomment-end:
// :snippet-end:
// :replace-end:
