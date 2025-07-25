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
        console.log(collection.dbName)
        
        // await findOneDocument({ name: "David Lee" });
        // await findDocuments();
        await findDocumentsByQuery({ color: "White" });

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findOneDocument(query) {
    const document = await collection.findOne(query);

    if (!document) {
        console.log(`No document found with the specified query`);
        return;
    }

    console.log(`Document found with _id: ${document._id}`);
    console.log(document);
}

async function findDocuments() {
    const cursor = await collection.find();
    const document = await cursor.toArray();
    console.log(document);
    console.log(`${document.length} documents found`);
}

async function findDocumentsByQuery(query) {
    const cursor = await collection.find(query);
    const documents = await cursor.toArray();

    if (documents.length === 0) {
        console.log('No documents found');
        return;
    }
    console.log(documents);
    console.log(`${documents.length} documents found with that query`);
    return documents;
}
