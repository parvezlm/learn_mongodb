const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'car_dealership';
const db = client.db(dbName);
const collection = db.collection('cars');
const fs = require('fs').promises;

//read json file
async function readJsonFile() {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        const json = JSON.parse(data);
        return json;
    } catch (err) {
        console.error(err);
    }
}


async function main() {
   try {
    await client.connect();
    console.log('Connected successfully to server');
    const cars = await readJsonFile();

    //functions call
    // await listDatabases(client);
    // await addCar(cars[0]);
    // await addMultipleCars(cars);
    // await findDocuments();
    // await findOneDocument()
    await findDocumentsByQuery({"make": "Honda"})
   }
   catch(err) {
     console.error(err)
   } finally {
    await client.close();
   }
}
main().catch(console.error);


// database list
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    // console.log('Databases:', databasesList.databases);
    databasesList.databases.forEach(db => {
        console.log('Databases:');
        console.log(db.name)
    });
}

// Insert a single document
async function addCar(car) {
  const result = await collection.insertOne(car);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

// insert multiple documents
async function addMultipleCars(cars) {
    const result = await collection.insertMany(cars);
    console.log(`Documents were inserted with the _id: ${result.insertedIds}`);
}

// find documents
async function findDocuments() {
    const cursor = collection.find();
    const result = await cursor.toArray();
    console.log(result);
}

// find one document and it will return the first document of the collection
async function findOneDocument() {
    const result = await collection.findOne();
    console.log(result);
}

// find one document by query
async function findOneDocumentsByQuery(query) {
    result = await collection.findOne(query);
    console.log(result);
}

