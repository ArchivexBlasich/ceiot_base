import db, { COLLECTION_NAME } from './pool.js';

export async function insertMeasurement(message) {
    const {insertedId} = await db.collection(COLLECTION_NAME).insertOne(message);
    return insertedId;
}
