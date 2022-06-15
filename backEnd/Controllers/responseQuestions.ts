import { Tag } from "../Utility/Enums/tag";
import { databaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";

// Questions to be offered to the 
export class Response implements databaseObject {
    // An array of returned questions and their associated ID's
    questions: [{id: String, question: String}];
    // The tags the user has selected to filter the responses they receive
    tags: [Tag]
    
    constructor(questions: [{id: String, question: String}], tags: [Tag]) {
        this.questions = questions;
        this.tags = tags
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            tags: this.tags
        }
    }
}