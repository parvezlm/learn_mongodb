const { MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'employees_record';
const db = client.db(dbName);
const collection = db.collection('employees');
const fs = require('fs').promises;

async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const empData = await readJsonFile();
        // console.log(empData)

        // await insertSingleDocument(empData);
        await insertMultipleDocuments(empData);

    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// reading json file
async function readJsonFile() {
    try {
        const data = await fs.readFile('employees.json', 'utf-8');
        const json = JSON.parse(data);
        return json;
    } catch (err) {
        console.error(err);
    }
}


// insert single documents in collection
async function insertSingleDocument(data) {
    const result = await collection.insertOne(data[0]);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

async function insertMultipleDocuments(data) {
    const result = await collection.insertMany(data);
    console.log(`Documents were inserted with the _id: ${result.insertedIds}`);
    console.log(`${result.insertedCount} documents were inserted.`);
}
