import 'dotenv/config';
import { MongoClient } from 'mongodb';

if (!process.env.DB_MONGO_HOST || !process.env.DB_MONGO_PORT || !process.env.DB_MONGO_USER || !process.env.DB_MONGO_PASSWORD || !process.env.DB_MONGO_DATABASE) {
 throw new Error('Faltan variables de entorno:');
}

const uri = `mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}/?authSource=admin&maxPoolSize=20&w=majority`;

const client = new MongoClient(uri);


export async function checkMongo() {
    try {
        await client.db().command({ ping: 1 });
        return true;
    } catch (err) {
        return false;
    }
}

export const COLLECTION_NAME = 'measurements';
export default client.db(process.env.DB_MONGO_DATABASE);