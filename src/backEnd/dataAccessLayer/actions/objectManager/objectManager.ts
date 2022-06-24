import mongoose, { Model, Schema } from "mongoose";
import { DatabaseObject } from "@/Controllers/Interfaces/databaseObject";
import { Tag } from "@/Utility/Enums/tag";
import Database from "@/Database/database";


export class ObjectManager {

    /// save a copy of the given object as the supplied model to the database
    static async saveObject(obj: DatabaseObject, model: mongoose.Model<any>) {
        await Database.setupClient();
        /// The hashMapped values of the object
        const values = obj.toHashMap()
        const buildModel = new model(values)
        
        return  buildModel.save()
    }

    /// return all entries in the database that match the given model
    /// Cast the result as an array of objects you expect from the call.
    /// Ie> i'm getting all of the questions so i cast them as: question[]
    static async findAll(model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that needs to be Cast to the requested object type 
        const foundEntries = await model.find({})

        return foundEntries
    }

    /// find a specific object by it's model and mongoose _id and returns a mongoose query
    /// Cast the result as the object type you expect from the call.
    static async find(model: mongoose.Model<any>, id: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns the request query that needs to be Cast to the requested object type 
        const foundEntry = await model.findById({ _id: id })
        
        return foundEntry
    }

    static async findByTags(model: mongoose.Model<any>, inputTags: Tag[]) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes documents that contain the same tags given to the array needs to be Cast to the requested object type 
        const foundEntries = await model.find({ tags: {$all:  [inputTags]} })
        
        return foundEntries
    }
}
