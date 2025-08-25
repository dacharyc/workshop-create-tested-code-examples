//	:replace-start: {
//	  "terms": {
//	    "process.env.CONNECTION_STRING": "\"<connection-string>\"",
//      "export ": "",
//      "runSearchQuery": "main"
//	  }
//	}
import { MongoClient } from 'mongodb';
// :snippet-start: basic-query
// :uncomment-start:
//const { MongoClient } = require("mongodb");
// :uncomment-end:

export async function runSearchQuery() {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);

    try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const query = [
      {
        $search:
        {
          text: {
            query: "baseball",
            path: "plot",
          },
        }
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          title: 1,
          plot: 1,
        },
      },
    ];

    const cursor = movies.aggregate(query);
    await cursor.forEach(doc => console.log(doc));
    // :remove-start:
    const testOutputCursor = movies.aggregate(query);
    const outputDocuments = [];
    await testOutputCursor.forEach(doc => {
        outputDocuments.push(doc)
    });
    return outputDocuments;
    // :remove-end:
  } finally {
    await client.close();
  }
}

// :uncomment-start:
//main().catch(console.error);
// :uncomment-end:
// :snippet-end:
// :replace-end:
