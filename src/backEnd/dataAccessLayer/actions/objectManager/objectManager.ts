//mongoose imports
import mongoose from "mongoose";
//database
import Database from "@/database/database";
//models
import ResponseModel from "@/dataAccessLayer/schemas/response";
import UserModel from "@/dataAccessLayer/schemas/user";
import ApprovedResponseModel from "@/dataAccessLayer/schemas/approvedResponse";
//interfaces
import { CMResponse } from "@interfaces/Response";
import { DatabaseObject } from "@interfaces/DatabaseObject";
//tag enum
import { Tag } from "@/utility/Enums/tag";

import { HashMap } from "@interfaces/HashMap";

export class ObjectManager {

    /// save a copy of the given object as the supplied model to the database
    static async saveObject(obj: DatabaseObject, model: mongoose.Model<any>) {
        await Database.setupClient();
        /// The hashMapped values of the object
        const values = obj.toHashMap();
        const buildModel = new model(values);
        
        return  buildModel.save();
    }

    static async create(model: mongoose.Model<any>, values: any) {
        /// establishes a connection to the database
        await Database.setupClient();
       
        const result = await model.create(values);

        return result;
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

    // Reference:
    // https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose
    /// find a specific object by it's model and mongoose _id and returns a mongoose query
    /// Cast the result as the object type you expect from the call.
    static async findRandom(model: mongoose.Model<any>, ratedResponseIDs: [string?]) {
        /// establishes a connection to the database
        await Database.setupClient();
        // get the number of documents in the given model
        const numberOfDocuments: number = await model.estimatedDocumentCount();
        //get updated response IDs - response which have been rated
        const updatedResponsesIds = await model.find({
            '_id': { $in: ratedResponseIDs }
        }).select('_id');
        // get a random number of documents to skip
        var random = Math.floor(Math.random() * (numberOfDocuments-updatedResponsesIds.length));
        /// returns the request query that needs to be Cast to the requested object type 
        const foundEntry = await model.findOne({
            '_id': { $nin: updatedResponsesIds }
        }).skip(random);

        return foundEntry;
    }
    
    /// find user document by email
    static async findByEmail(model: mongoose.Model<any>, email: any) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes document that contain the email
        const foundEntries = await model.findOne({email: email});

        return foundEntries;
    }

    //finds the document that matches the regex string
    static async  findByRegex(model: mongoose.Model<any>, regex: string, field: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes documents that contain regex string 
        const foundEntries = await model.find({ [field]: {$regex: regex, $options: 'i'}});

        return foundEntries;
    }

    /// find all documents for the given model that contains the given tags
    static async findByTags(model: mongoose.Model<any>, inputTags: [Tag]) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes documents that contain the same tags given to the array needs to be Cast to the requested object type 
        const foundEntries = await model.find({ tags: {$all:  [inputTags]} });
        
        return foundEntries;
    }

    //// find documents by a query object   
     static async findByQuery(model: mongoose.Model<any>, query: HashMap) {         
        /// establishes a connection to the database        
        await Database.setupClient();        
        /// returns a mongoose document that that matches the query    
        const foundEntries = await model.findOne(query);          
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

    /// find and return all the repsonses that match the given prompt(id)
    static async findResponseByID(promptID: String) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns an array of responses with the matching promptID
        const foundEntries: CMResponse[] = await ResponseModel.find({ promptID: {$all:  promptID} });
        
        return foundEntries as CMResponse[];
    }

    //find responses by their ids
    static async findByIds(ids: string[], model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        // find by ID and update the given values, returning the updated document when completed
        var returnResult = await model.find({"_id": {$in: ids}});
        
        return returnResult;
    }

    static async findApprovedResponseByID(promptID: String) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns an array of responses with the matching promptID
        const foundEntries: CMResponse[] = await ApprovedResponseModel.find({ promptID: {$all:  promptID} });
        
        return foundEntries as CMResponse[];
    }

    /// updates the matching response rating based on the boolean recieved
    static async updateRatingByID(_id: string, rating:Boolean) {
        /// establishes a connection to the database
        await Database.setupClient();
        // find by ID and increase or decrease the rating value based on whether the rating is true or not. If there is an error log it
        let inc: Number = rating? 1 : -1;
        const retval = ResponseModel.findOneAndUpdate({_id: _id}, { $inc: { rating: inc } }, { returnDocument: 'after' });
        
        return retval;
    }

    /// updates the document that matches the id with the valuse in the obj parameter for the given model
    static async updateUserRatedResponseByID(_id:string, userID: string, responseID: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        // find by ID and update the given values, returning the updated document when completed
        var returnResult = await UserModel.findOneAndUpdate({_id: userID}, { $inc: {  $push: { savedResponses: responseID } } }, { returnDocument: 'after' });
        
        return returnResult;
    } 

    /// updates the document that matches the id with the valuse in the obj parameter for the given model
    static async updateByID(_id: string, obj: HashMap, model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        // find by ID and update the given values, returning the updated document when completed
        var returnResult = await model.findOneAndUpdate({_id: _id}, obj, { returnDocument: 'after' });
        
        return returnResult;
    } 
}
