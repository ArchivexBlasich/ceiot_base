import db, { COLLECTION_NAME } from './pool.js';

export async function getMeasurements() {
    return await db.collection(COLLECTION_NAME).find({}).toArray();
}