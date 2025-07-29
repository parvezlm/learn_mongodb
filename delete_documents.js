const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'car_dealership';
const db = client.db(dbName);
const collection = db.collection('cars');


async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        //======== **** =====
        await deleteDocument({ name: "Toyota" });

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteDocument(query) {
    await collection.deleteOne(query);
    console.log(`Document was deleted`);
}
