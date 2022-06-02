import { databaseObject } from "@/Models/Interfaces/databaseObject";
import mongoose, { Model, Schema } from "mongoose";

export class objectManager {

    static saveObject(collectionName: string, obj: databaseObject,  schema: Schema) {

        /// The hashMapped values of the object
        const values = obj.toHashMap()
        /// The base mongoose model to build the object with
        const MongooseModel = mongoose.model(collectionName, schema)
        /// the base mongoose model with values added to its fields
        const finishedModel = new MongooseModel({values})
    }
}