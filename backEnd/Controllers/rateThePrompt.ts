import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";
import { Saveable } from "./Interfaces/saveable";

// Stores users feedback on a given user response
export class RateThePrompt implements DatabaseObject, Saveable {
    // the email address of the user giving feedback
    email: String;
    // the unique mongoose id for the question you are giving feedback for
    _id: String;
    // the rating given by the user, either  1 or -1
    rating: number;
    
    constructor(_id: String, email: String, rating: number) {
        this.email = email;
        this._id = _id;
        this.rating = rating;
    }

    save() {
        /// TODO the model argument is temp and should be replaced by abbes code when it is pushed
        // return ObjectManager.saveObject(this, feedbackModel)
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            email: this.email,
            _id: this._id,
            rating: this.rating
        }
    }

}