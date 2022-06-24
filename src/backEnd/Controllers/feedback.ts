import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Stores users feedback on a given user response
export class Feedback implements DatabaseObject {
    // gets the responseid from the response the feedback is given to
    responseID: String;
    // the _id of the user that is giving the feedback
    userID: String;
    // the rating the user gives the response
    rating: Boolean;
    
    constructor(userID: String, responseID: String, rating: Boolean) {
        this.responseID = responseID;
        this.userID = userID;
        this.rating = rating;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            responseID: this.responseID,
            userID: this.userID,
            rating: this.rating
        };
    }

}