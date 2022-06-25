import { ObjectManager } from "@/dataAccessLayer/objectManager/objectManager";
import { HashMap } from "@/Interfaces/HashMap";
import { Saveable } from "@/Interfaces/Saveable";
import { DatabaseObject } from "@/Interfaces/DatabaseObject";
import PromptModel from "../Schemas/prompt";
import { Prompt } from "@/Interfaces/Prompt";


// actions accessable to manipulate promps or add new ones
export class PromptController implements DatabaseObject, Saveable, Prompt {
    // The user submitting the prompts ID
    userID: String;
    // The prompt the user has given
    prompt: String;
    
    constructor(userID: String, prompt: String) {
        this.userID = userID;
        this.prompt = prompt;
    }
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, PromptModel)
    }

    // retrieves all prompts
    static getPrompts() {
        return ObjectManager.findAll(PromptModel)
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            userID: this.userID,
            prompt: this.prompt
        }
    }
}