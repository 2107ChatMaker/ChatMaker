import { Tag } from "../Utility/Enums/tag";
import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";
import { ObjectManager } from "@/dataAccessLayer/actions/objectManager/objectManager";
import ResponseModel from "./Schemas/response";

// Stores users feedback on a given user response
export class responseSubmission implements DatabaseObject {
    // the userID of the user giving feedback
    readonly userID: String;
    // the promptID of the question the user is being asked
    readonly promptID: String;
    // The response the user has given
    readonly response: String;
		// The tags the users has chosen for their response
    readonly tags: [Tag]
    
    constructor(promptID: String, userID: String, tags: [Tag], response: String) {
        this.userID = userID;
      	this.tags = tags;
        this.promptID = promptID;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response either too short or too long")
        }
    }

    
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, ResponseModel)
    }
		
		/// converts given values into a HashMap
		toHashMap(): HashMap {
			return {
					userID: this.userID,
					promptID: this.promptID,
					response: this.response,
					tags: this.tags
			}
	}
}