import ApprovedResponseModel from "../schemas/approvedResponse";
import { ObjectManager } from "./objectManager";
import { HashMap } from "@interfaces/HashMap";


export class ApprovedResponseController {

    //get approved responses
    static async getApprovedResponse(id: string) { 
        //finds the responses by id   
        const results = await ObjectManager.find(ApprovedResponseModel, id); 
        return results;
    }

    static async getApprovedResponses(ids: string[]) {
        //finds the responses by id    
        const results = await ObjectManager.findByIds(ids, ApprovedResponseModel);
        return results;
    }

    static async approvedResponse(response: HashMap) {
        //finds the responses by id  
        const results = await ObjectManager.create(ApprovedResponseModel, response);
        return results;
    }

    // get a random response thats not in the given id list
    static async getRandomResponse(ignoredIDs: [string?], promptID: string) {
        const results = await ObjectManager.findRandomApproved(ApprovedResponseModel, ignoredIDs, promptID);
        return results;
    }
}