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

        // update a single document
        // await updateSingleDocument(
        //     { make: "Toyota" },
        //     { sunroof: true}
        // );

        // upsert a document
        // await upsertDocument(
        //     { name: 'Toyota', features: { $exists: false} },
        //     { features: [
        //         "Bluetooth",
        //         "Backup Camera",
        //         "Lane Assist",
        //         "Heated Seats"
        //     ]},
        // )

        // remove a field using unset
        // await unsetDocuments(
        //     { name: 'Toyota' },
        //     { features: "" }
        // )

        // rename a field
        await renameField(
            { make: 'Toyota' },
            { 'sunroof': "panoramicSunroof" }
        )

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function updateSingleDocument(filter, update) {
   const result  = await collection.updateOne(filter, { $set: update });
//    const documents = cursor.toArray()
    console.log(`${result.modifiedCount} document(s) was/were updated`);
    console.log(`${result.matchedCount} document(s) was/were matched`);
}

async function upsertDocument(filter, update) {
    const result = await collection.updateOne(filter, { $set: update }, { upsert: true });

    if (result.upsertedCount > 0) {
        console.log(`${result.upsertedCount} document(s) was/were inserted`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}


async function unsetDocuments(filter, update) {
    const result = await collection.updateOne(filter, { $unset: update});
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

async function renameField(filter, update) {
    const result = await collection.updateOne(filter, { $rename: update});
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

