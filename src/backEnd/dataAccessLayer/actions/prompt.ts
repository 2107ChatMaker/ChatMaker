import { HashMap } from "@interfaces/HashMap";
import { Saveable } from "@interfaces/Saveable";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { Prompt } from "@interfaces/Prompt";
import { ObjectManager } from "./objectManager/objectManager";
import PromptModel from "../schemas/prompt";

// actions accessable to manipulate promps or add new ones.
export class PromptController implements DatabaseObject, Saveable, Prompt {
    // The user submitting the prompts ID
    userID: string;
    // The prompt the user has given
    prompt: string;
    
    constructor(userID: string, prompt: string) {
        this.userID = userID;
        this.prompt = prompt;
    }
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, PromptModel);
    }

    // retrieves all prompts
    static getPrompt(_id: string) {
        return ObjectManager.find(PromptModel, _id);
    }

    // retrieves all prompts
    static getPrompts() {
        return ObjectManager.findAll(PromptModel);
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            userID: this.userID,
            prompt: this.prompt
        };
    }
}