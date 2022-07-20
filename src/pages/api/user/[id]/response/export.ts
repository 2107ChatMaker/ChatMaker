import { PromptController } from "@/dataAccessLayer/actions/prompt";
import { ApprovedResponseController } from "@/dataAccessLayer/actions/approvedRating";
import { UserController } from "@/dataAccessLayer/actions/user";
import { NextApiRequest, NextApiResponse } from "next";

// used to get the information to make a rating card or to update (+/-) a resonses rating
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method != "GET") {
            throw {
                code: 405,
                message: "Method not allowed"
            };
        }

        // gets the userID passed in the url
        const {id} = req.query;
        if (!id || typeof id !== "string") {
            throw {
                code: 400,
                message: 'username does not exist'
            };
        }
        //get user saved responses ids
        const saveResponsesIds: string[] = await UserController.getSavedResponses(id);
        if (!saveResponsesIds) {
            throw {
                code: 204,
                message: 'no items saved'
            };
        }
        
        // translate reponse id's into responses
        const savedResponses = await ApprovedResponseController.getApprovedResponses(saveResponsesIds);
        if (!savedResponses) {
            throw {
                code: 204,
                message: 'No matching responses'
            };
        }
        // empty array whihc will hold custom return json
        const exportResponse = [];
        
        // generate content in exportResponse
        for (let i = 0; i < savedResponses.length; i++) {
            const prompt: PromptController = await PromptController.getPrompt(savedResponses[i].promptID);
            exportResponse.push({
                prompt: prompt.prompt,
                response: savedResponses[i].response,
                tags: savedResponses[i].tags
            });
            
        }
        if (!exportResponse) {
            throw {
                code: 204,
                message: 'no items saved'
            };
        }

        // stringify the values for return
        const test = JSON.stringify(exportResponse);
        // successful return of json
        res.status(200).json(test);
            
    } catch(error) {
        const {code = 500, message} = error;

        res.status(code).json({message});
    }
}