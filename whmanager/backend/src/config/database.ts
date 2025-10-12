import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection
  // across hot reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
