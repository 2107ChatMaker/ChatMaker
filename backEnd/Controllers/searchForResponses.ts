import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Represents all responses returned from the database for this question that match the chosen tags
export class SearchForResponses implements DatabaseObject {
    // the questionID of the question the user was asked
    _id: string;
    // an array of question objects the query returned
    questions: [{_id:string, question: string}][] = [];

    constructor(id: string, questions: [{_id:string, question: string}][]) {
        this._id = id;
        this.questions = questions;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            _id: this._id,
            questions: this.questions
        }
    }
}