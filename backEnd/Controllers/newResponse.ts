import { Tag } from "../Utility/Enums/tag";
import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Stores users response to a given question
export class newResponse implements DatabaseObject {
    // the _id of the user giving feedback
    readonly _id: String;
    // the question the user is being asked
    readonly question: String;
    // The response the user has given
    readonly response: String;
		// The tags the users has chosen for their response
    readonly tags: [Tag]
    
    constructor(question: String, id: String, tags: [Tag], response: String) {
        this._id = id;
      	this.tags = tags;
        this.question = question;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response Either too short or too long")
        }
    }

    /// Saves this object to the database or update it if it already exists
    save() { 
              //TODO must implement when abbes db code is merged
    // ObjectManager.saveObject(this, ResponseSubmission)
    }
		
		/// converts given values into a HashMap
		toHashMap(): HashMap {
			return {
                _id: this._id,
                question: this.question,
                response: this.response,
                tags: this.tags
			}
	}
}