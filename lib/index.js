import { MongoClient } from "mongodb";

const {MONGO_URL, MONGO_DB} = process.env;

if(!MONGO_URL) {
    throw new Error("Please define a MongoDB uri in .env.local")
}
if (!MONGO_DB) {
    throw new Error("Provide a database")
}

let client
let clientPromise
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URL, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGO_URL, options)
  clientPromise = client.connect()
}

async function connectToDatabase(){
	if(!client || !clientPromise) {
		client = new MongoClient(MONGO_URL, options)
		clientPromise = client.connect()
	}
	const res = await clientPromise;
	return {client, db: res.db(MONGO_DB)}
}

export {
	clientPromise,
	connectToDatabase
}