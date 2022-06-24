import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Represents all responses returned from the database for this question that match the chosen tags
export class ResponseSearchResult implements DatabaseObject {
    // the promptID of the question the user was asked
    promptID: String;
    // The number of user responses associated with this question
    numberOfResponses: number;

    constructor(question: String, numberOfResponses: number) {

        this.promptID = question;
        this.numberOfResponses = numberOfResponses;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            promptID: this.promptID,
            numberOfResponses: this.numberOfResponses
        }
    }
}