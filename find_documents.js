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
        // await findDocumentsByQuery({ color: "Black" });
        // await findDocumentsByQueryAndProjection(
        //     { color: "Black" }, 
        //     { projection: { color: 1, price: 1, make: 1, model: 1 } }
        // );

        // ====== operators =====
        // await filterDocumentsBycomparisonOperators({ price: { $gte: 30000}, year: { $gte: 2012 } });
        // await filterDocumentsByLogicalOperators(
        //     { 
        //         $and: [ 
        //             { color: "Black" },
        //             { year: { $gte: 2012} },
        //             { price: { $gte: 20000 } }
        //         ]
        //     },
        //     { projection: { make: 1, color: 1, year: 1, price: 1 } }
        // );

        await checkFieldExists({ isAvailable: { $exists: false}});

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


async function findDocumentsByQueryAndProjection(query, projection) {
    const cursor = await collection.find(query, projection);
    const documents = await cursor.toArray();

    if (documents.length === 0) {
        console.log('No documents found');
        return;
    }
    console.log(documents);
    console.log(`${documents.length} documents found with that query`);
    return documents;
}

async function filterDocumentsBycomparisonOperators(query) {
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

async function filterDocumentsByLogicalOperators(query, projection) {
    const cursor =await collection.find(query, projection);
    const documents = await cursor.toArray();

    if (documents.length === 0) {
        console.log('No documents found');
        return;
    }
    console.log(documents);
    console.log(`${documents.length} documents found with that query`);
    return documents;
}

async function checkFieldExists(query) {
   const cursor =  await collection.find(query);
   const document = await cursor.toArray();

   if (document.length === 0) {
    console.log('No documents found');
    return;
   }
   console.log(document);
   console.log(`${document.length} documents found with that query`);
   return document;
}
