import { Tag } from "../Utility/Enums/tag";
import { databaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";

// Stores users feedback on a given user response
export class responseSubmission implements databaseObject {
    // the email address of the user giving feedback
    readonly email: String;
    // the question the user is being asked
    readonly question: String;
    // The response the user has given
    readonly response: String;
		// The tags the users has chosen for their response
    readonly tags: [Tag];
    
    constructor(question: String, email: String, tags: [Tag], response: String) {
        this.email = email;
      	this.tags = tags;
        this.question = question;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response Either too short or too long");
        }
    }
		
		/// converts given values into a HashMap
		toHashMap(): HashMap {
			return {
					email: this.email,
					question: this.question,
					response: this.response,
					tags: this.tags
			};
	}
}