//mongo imports
import mongoose from "mongoose";
import { MongoClient } from "mongodb";


//Reference Yudhvirs class 2107
export default class Database {
    // MongoClient
    // uses typeof because it is importing the whole module not juast a class 
    static client: typeof mongoose;
    static clientPromise: Promise<MongoClient>;
    // Database Address
    private static uri: string = process.env.MONGODB_URI;

    /**
     * sets up the database singleton
     * @param uri connection uri of the database
     * @returns the database that has been setup
     */
    static async setup() {
        if (!this.client) {
            await this.setupClient();
        }

        // returns the database object
        return this.client;
    }

    /**
     * sets up the client object
     * @param uri connection uri of the database
     * We expect the database name will be contained in the URL
     * check .env to see it is /default
     */
    static async setupClient() {
        // connect the client to the server
        const client = await mongoose.connect(Database.uri);
        this.client = client;
    }

    /*
    * set up monogodb-adapter connection for next-auth
    */
    static async setupAdapterConnection() {
        if (!this.clientPromise) {
            this.clientPromise = MongoClient.connect(Database.uri);
        }
        return this.clientPromise;
    }
}