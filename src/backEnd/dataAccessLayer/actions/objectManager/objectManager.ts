import mongoose, { Model, Schema } from "mongoose";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { Tag } from "@/utility/Enums/tag";
import Database from "@/Database/database";
import ResponseModel from "@/dataAccessLayer/schemas/response";

export class ObjectManager {

    /// save a copy of the given object as the supplied model to the database
    static async saveObject(obj: DatabaseObject, model: mongoose.Model<any>) {
        await Database.setupClient();
        /// The hashMapped values of the object
        const values = obj.toHashMap();
        const buildModel = new model(values);
        
        return  buildModel.save();
    }

    /// return all entries in the database that match the given model
    /// Cast the result as an array of objects you expect from the call.
    /// Ie> i'm getting all of the questions so i cast them as: question[]
    static async findAll(model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that needs to be Cast to the requested object type 
        const foundEntries = await model.find({});

        return foundEntries;
    }

    /// find a specific object by it's model and mongoose _id and returns a mongoose query
    /// Cast the result as the object type you expect from the call.
    static async find(model: mongoose.Model<any>, id: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns the request query that needs to be Cast to the requested object type 
        const foundEntry = await model.findById({ _id: id });
        
        return foundEntry;
    }

    /// find user document by email
    static async findByEmail(model: mongoose.Model<any>, email: any) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes documents that contain the email
        const foundEntries = await model.findOne({email: email});

        return foundEntries;
    }

    /// delete an entry in the mongoose document for the given model that matches the given id
    static async deleteByID(model: mongoose.Model<any>, id: string) {
        /// establishes a connecti on to the database
        await Database.setupClient();
        /// deletes the given entry and returns whether it was successful
        const deleteSuccessful = await model.deleteOne({ _id: id });
        
        return deleteSuccessful.deletedCount == 1;
    }

    /// find all documents for the given model that contains the given tags
    static async findByTags(model: mongoose.Model<any>, inputTags: Tag[]) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes documents that contain the same tags given to the array needs to be Cast to the requested object type 
        const foundEntries = await model.find({ tags: {$all:  [inputTags]} });
        
        return foundEntries;
    }

    /// find and return all the repsonses that match the given prompt(id)
    static async findResponseByID( promptID: String) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns an array of responses with the matching promptID
        const foundEntries: Response[] = await ResponseModel.find({ promptID: {$all:  promptID} });
        
        return foundEntries;
    }

    /// updates the matching response rating based on the boolean recieved
    static async updateRatingByID(_id: string, rating:Boolean) {
        /// establishes a connection to the database
        await Database.setupClient();
        // find by ID and increase or decrease the rating value based on whether the rating is true or not. If there is an error log it
        let inc: Number = rating? 1 : -1;
        const retval = ResponseModel.findOneAndUpdate({_id: _id}, { $inc: { rating: inc } }, 
            function(error, result) {
                if (error) {
                    //console.log(error);
                    throw new Error(error);
                }
            });
    }
}
