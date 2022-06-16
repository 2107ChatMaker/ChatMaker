import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";
import { Saveable } from "./Interfaces/saveable"


// Questions to be offered to the 
export class Prompt implements DatabaseObject, Saveable {
    // The user submitting the prompts ID
    userID: String;
    // The prompt the user selected
    prompt: String;
    
    constructor(userID: String, prompt: String) {
        this.userID = userID;
        this.prompt = prompt;
    }
    /// Saves this object to the database or update it if it already exists
    save() { 
        //TODO must implement when abbes db code is merged
        // ObjectManager.saveObject(this, Prompt)
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            userID: this.userID,
            prompt: this.prompt
        }
    }
}