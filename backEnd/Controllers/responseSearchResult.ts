import { databaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";

// Represents all responses returned from the database for this question that match the chosen tags
export class ResponseSearchResult implements databaseObject {
    // the questionID of the question the user was asked
    questionID: String;
    // The number of user responses associated with this question
    numberOfResponses: number;

    constructor(question: String, numberOfResponses: number) {

        this.questionID = question;
        this.numberOfResponses = numberOfResponses;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            questionID: this.questionID,
            numberOfResponses: this.numberOfResponses
        }
    }
}