const dbName = process.env.MONGO_INITDB_DATABASE;
if (!dbName) throw new Error('Falta MONGO_INITDB_DATABASE');

db.getSiblingDB(dbName).measurements.insertMany([
    { id: '00', t: '18', h: '78' },
    { id: '00', t: '19', h: '77' },
    { id: '00', t: '17', h: '77' },
    { id: '01', t: '17', h: '77' },
]);