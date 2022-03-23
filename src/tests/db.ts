import {MongoMemoryServer} from 'mongodb-memory-server'
import { connect, connection } from 'mongoose';

const db = new MongoMemoryServer();

//connect to mock db

export const connectDB = async () => {
    const mockUri = await db.getUri();
    await connect(mockUri as string);
}

export const closeDB = async () => {
    await connection.dropDatabase();
    await connection.close();
    await db.stop();
}

export const clearDB = async () => {
    const collections = connection.collections;

    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

