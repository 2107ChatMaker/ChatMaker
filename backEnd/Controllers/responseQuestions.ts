import { ObjectManager } from "@/dataAccessLayer/actions/objectManager/objectManager";
import { Tag } from "../Utility/Enums/tag";
import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";
import ResponseModel from "./Schemas/response";

// Questions to be offered to the 
export class Response implements DatabaseObject {
    // An array of returned questions and their associated ID's
    questions: [{id: String, question: String}];
    // The tags the user has selected to filter the responses they receive
    tags: [Tag]
    
    constructor(questions: [{id: String, question: String}], tags: [Tag]) {
        this.questions = questions;
        this.tags = tags
    }
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, ResponseModel)
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            tags: this.tags
        }
    }
}