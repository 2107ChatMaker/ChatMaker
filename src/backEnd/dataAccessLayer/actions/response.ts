import { HashMap } from "@constants/interfaces/HashMap";
import { Tag } from "@/utility/Enums/tag";
import { Saveable } from "@constants/interfaces/Saveable";
import { CMResponse } from "@constants/interfaces/Response";
import { DatabaseObject } from "@constants/interfaces/DatabaseObject";
import { ObjectManager } from "./objectManager/objectManager";
import ResponseModel from "../schemas/response";

// actions accessable to manipulate responses or add new ones
export class ResponseController implements DatabaseObject, Saveable, CMResponse {
    // the userID of the user giving the response
    readonly userID: String;
    // the promptID the response belongs too
    readonly promptID: String;
    // The response the user has given
    readonly response: String;
	// The tags the users has chosen for their response
    readonly tags: Tag[];
    
    constructor(userID: String, promptID: String, response: String,  _tags: Tag[]) {
        this.userID = userID;
        this.promptID = promptID;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response either too short or too long");
        }
        this.tags = _tags;
    }
    
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, ResponseModel);
    }

    // gets all responses that belong to the given prompt(id)
    static getResponsesByID(promptID: string) {
        return ObjectManager.findResponseByID(promptID);
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