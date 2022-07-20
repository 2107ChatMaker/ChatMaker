//interfaces
import { HashMap } from "@interfaces/HashMap";
import { Saveable } from "@interfaces/Saveable";
import { CMResponse } from "@interfaces/Response";
import { DatabaseObject } from "@interfaces/DatabaseObject";
//data access object
import { ObjectManager } from "./objectManager/objectManager";
//model
import ResponseModel from "../schemas/response";
//tags enum
import { Tag } from "@/utility/Enums/tag";


// actions accessable to manipulate responses or add new ones
export class ResponseController implements DatabaseObject, Saveable, CMResponse {
    // the id given to the user by mongo
    readonly _id: string;
    // the userID of the user giving the response
    readonly userID: string;
    // the promptID the response belongs too
    readonly promptID: string;
    // The response the user has given
    readonly response: string;
	// The tags the users has chosen for their response
    readonly tags: Tag[];
    
    constructor(userID: string, promptID: string, response: string, tags: Tag[]) {
        this.userID = userID;
        this.promptID = promptID;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response either too short or too long");
        }
        this.tags = tags;
    }
    
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, ResponseModel);
    }

    // gets all responses that belong to the given prompt(id)
    static async getResponsesByID(promptID: string) {
        return await ObjectManager.findResponseByID(promptID);
    }

    // gets the responses by the specific ID
    static async getResponsesByIds(ids: string[]) {
        return await ObjectManager.findResponsesByIds(ids);
    }

    //get approved responses by id
    static async getApprovedResponsesByID(PromptID: string) {
        const responses = await ObjectManager.findApprovedResponseByID(PromptID);
        return responses;
    }

    // get a random response thats not in the given id list
    static async getRandomResponse(ignoredIDs: [string?]) {
        return await ObjectManager.findRandom(ResponseModel, ignoredIDs);
    }

    // add rating to the given response
    static async rateResponse(ratingID: string, rating: Boolean, userID: string) {
        return await ObjectManager.updateRatingByID(ratingID, rating);
    }
		
    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
                userID: this.userID,
                promptID: this.promptID,
                response: this.response,
                rating: 0,
                tags: this.tags
        };
	}
}
