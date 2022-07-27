//mongo imports
import { _id } from "@next-auth/mongodb-adapter";

//interfaces
import { HashMap } from "@interfaces/HashMap";
import { Saveable } from "@interfaces/Saveable";
import { DatabaseObject } from "@interfaces/DatabaseObject";

//data access object
import { ObjectManager } from "./objectManager";

//model
import PromptModel from "../schemas/prompt";


// actions accessable to manipulate promps or add new ones.
export class PromptController implements DatabaseObject, Saveable {

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
    static async getPrompt(_id: string) {
        const results = await ObjectManager.find(PromptModel, _id);

        return results; 
    }

    // retrieves all prompts
    static async getPrompts(skip: number) {
        const getPrompts = await ObjectManager.findTen(PromptModel, skip);

        return getPrompts;
    }

    //get prompt by content
    static async getPromptByContent(content: string) {
        const results = await ObjectManager.findByQuery(PromptModel, { prompt: content });

        return results; 
    }

    // searchs prompts by user input 
    static async searchPrompts(searchQuery: string) {
        const results = await ObjectManager.findByRegex(PromptModel, searchQuery, "prompt");

        return results; 
    }

    //searches by the promptID
    static async findPromptByID(promptID: string) {
        const results = await ObjectManager.find(PromptModel, promptID);

        return results; 
    }

    // get a random response thats not in the given id list
    static async getRandomPrompt(ignoredIDs: [string?]) {
        return await ObjectManager.findRandom(PromptModel, ignoredIDs);
    }

    // Tags are returned as a hashmap
    toHashMap(): HashMap {
        return {
            userID: this.userID,
            prompt: this.prompt
        };
    }
}