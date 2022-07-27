import ApprovedResponseModel from "../schemas/approvedResponse";
import { ObjectManager } from "./objectManager";
import { HashMap } from "@interfaces/HashMap";


export class ApprovedResponseController {

    //get approved responses
    static async getApprovedResponse(id: string) { 
        //finds the responses by id     
        return await ObjectManager.find(ApprovedResponseModel, id);   
    }

    static async getApprovedResponses(ids: string[]) {
        //finds the responses by id     
        return await ObjectManager.findByIds(ids, ApprovedResponseModel);
    }

    static async approvedResponse(response: HashMap) {
        //finds the responses by id     
        return await ObjectManager.create(ApprovedResponseModel, response);
    }

    // get a random response thats not in the given id list
    static async getRandomResponse(ignoredIDs: [string?], promptID: string) {
        return await ObjectManager.findRandomApproved(ApprovedResponseModel, ignoredIDs, promptID);
    }
}