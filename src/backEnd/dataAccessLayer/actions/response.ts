import { HashMap } from "@interfaces/HashMap";
import { Tag } from "@/Utility/Enums/tag";
import { Saveable } from "@interfaces/Saveable";
import { CMResponse } from "@interfaces/Response";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { ObjectManager } from "./objectManager/objectManager";
import ResponseModel from "../schemas/response";
import { ObjectId } from "mongoose";

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
    
    constructor(userID: string, promptID: string, response: string,  tags: Tag[]) {
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
    static getResponsesByID(promptID: string) {
        const theseResponses = ObjectManager.findResponseByID(promptID);
        return theseResponses
    }

    // get a random response thats not in the given id list
    static getRandomResponse(ignoredIDs: [string?]) {
        return ObjectManager.findRandom(ResponseModel, ignoredIDs);
    }

    // add rating to the given response
    static rateResponse(ratingID: string, rating: Boolean, userID: string) {
        return ObjectManager.updateRatingByID(ratingID, rating);
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
