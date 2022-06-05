import { databaseObject } from "@/Models/Interfaces/databaseObject";
import { Tag } from "@/Utility/Enums/tag";
import mongoose, { Model, Schema } from "mongoose";

export class ObjectManager {

    /// save a copy of the given object as the supplied model to the database
    static async saveObject(obj: databaseObject, model: mongoose.Model<any>) {

        /// The hashMapped values of the object
        const values = obj.toHashMap()
        const buildModel = new model({values})
        
        return  buildModel.save()
    }

    /// return all entries in the database that match the given model
    /// Cast the result as an array of objects you expect from the call.
    /// Ie> i'm getting all of the questions so i cast them as: question[]
    static async findAll(model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient(process.env.MONGODB_URI);
        /// returns a mongoose query that needs to be Cast to the requested object type 
        const foundEntries = await model.find({})

        return foundEntries
    }

    /// find a specific object by it's model and mongoose _id and returns a mongoose query
    /// Cast the result as the object type you expect from the call.
    static async find(model: mongoose.Model<any>, id: number) {
        /// establishes a connection to the database
        await Database.setupClient(process.env.MONGODB_URI);
        /// returns the request query that needs to be Cast to the requested object type 
        const foundEntry = await model.findById({ _id: id })
        
        return foundEntry
    }

    static async findByTags(model: mongoose.Model<any>, inputTags: Tag[]) {
        /// establishes a connection to the database
        await Database.setupClient(process.env.MONGODB_URI);
        /// returns a mongoose query that only includes documents that contain the same tags given to the array needs to be Cast to the requested object type 
        const foundEntries = await model.find({ tags: {$all:  [inputTags]} })
        
        return foundEntries
    }

    // export async function getJaguars() {
    //     await Database.setupClient(process.env.MONGODB_URI);
    //     const jaguars = await JaguarModel.find({});
    
    //     return jaguars as Jaguar[];
    // }
    
    // export async function createJaguar(name: string, speedLimit: number, colour: string, pattern: Jaguar.Pattern) {
    //     // setup the client
    //     await Database.setupClient(process.env.MONGODB_URI);
    //     const jaguar = new JaguarModel(
    //         {
    //             name,
    //             speedLimit,
    //             colour,
    //             pattern
    //         }
    //     );
    
    //     return jaguar.save();
    // }
}

export default class Database {
    // MongoClient
    // uses typeof because it is importing the whole module not juast a class 
    static client: typeof mongoose;

    /**
     * sets up the database singleton
     * @param uri connection uri of the database
     * @returns the database that has been setup
     */
    static async setup(uri: string) {
        if (!this.client) {
            await this.setupClient(uri);
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
    static async setupClient(uri: string) {
        // connect the client to the server
        const client = await mongoose.connect(uri)


        this.client = client;
    }
}