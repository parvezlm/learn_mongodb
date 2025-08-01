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

        // ============ ****** ==========
        // await filterDocumentsByLogicalOperators (
        //     {
        //         isAvailable : false,
        //         price: { $gte: 20000 },
        //         color: "Black"
        //     }
        // )

        await projcetPipelieOper(
            { 
                make: 1, 
                color: 1, 
                year: 1,
            }
        )

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function filterDocumentsByLogicalOperators(query) {
    const documents = await collection.aggregate([
        { 
            $match: query
        }
    ]).toArray();

    // const documents = cursor.toArray();
    // console.log(documents)
    console.log(`${documents.length} documents found with that query`);
    return documents;
}


// projct pipeline operator
async function  projcetPipelieOper(query) {
    const documents = await collection.aggregate([
        { 
            $project: query,
        }
    ]).toArray();

    console.log(documents);
    console.log(`${documents.length} documents found with that query`);
    return documents;
}
