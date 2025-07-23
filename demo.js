const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'car_dealership';
const db = client.db(dbName);
const collection = db.collection('cars');

async function main() {
    // Insert a single document
    const result = await collection.insertOne({

        maker: 'Mahindra',
        model: 'Scorpio N',
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        engine: {
            type: 'Naturally Aspirated',
            cc: 1197,
            torque: '113 Nm'
        },
        features: [
            'Projector Headlamps',
            'Apple CarPlay',
            'ABS'
        ],
        sunroof: false,
        airbags: 4
        
    });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}
main().catch(console.error);
