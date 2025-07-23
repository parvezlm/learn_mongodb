const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'car_dealership';
const db = client.db(dbName);
const collection = db.collection('cars');


const car = {
    maker: 'Mahindra',
    model: 'XUV 300',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    engine: {
        type: 'Naturally Aspirated',
        cc: 1197,
        torque: '100 Nm'
    },
    features: [
        'Projector Headlamps',
        'Apple CarPlay',
        'ABS'
    ],
    sunroof: false,
    airbags: 2
    
};

async function main() {
   try {
    await client.connect();
    console.log('Connected successfully to server');

    //functions call
    await listDatabases(client);
    await addCar(car);
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



