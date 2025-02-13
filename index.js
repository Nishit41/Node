const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://ranjan:mongodbproject@cluster0.h7xdn.mongodb.net/admin";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("HelloWorld");
    const users = database.collection("User");

    users.insertOne({
      name: "Ranjan",
    });

    users.insertOne({ name: "sagarika" });
    const query = { name: "Nishit" };

    users.updateOne({ name: "Nishit" }, { $set: { age: 25 } });

    console.log(users);

    const deletedResult = users.deleteOne({
      _id: new ObjectId("67ae3a03af471c72ac57f757"),
    });
    console.log(`Deleted ${deletedResult.deletedCount} document(s).`);

    const filteredUser = await users.findOne(query);

    console.log(filteredUser);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
