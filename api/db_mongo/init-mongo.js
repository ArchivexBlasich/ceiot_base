const dbName = process.env.MONGO_INITDB_DATABASE;
if (!dbName) throw new Error('Falta MONGO_INITDB_DATABASE');

db.getSiblingDB(dbName).measurements.insertMany([
    { id: '00', t: 18, p: 98054.10 },
    { id: '00', t: 19, p: 98054.10 },
    { id: '00', t: 17, p: 98054.10 },
    { id: '01', t: 17, p: 98054.10 },
]);