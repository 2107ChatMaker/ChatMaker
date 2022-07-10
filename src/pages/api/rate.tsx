import { PromptController } from "@/dataAccessLayer/actions/prompt";
import { ResponseController } from "@/dataAccessLayer/actions/response";
import { Prompt } from "@interfaces/Prompt";
import { CMResponse } from "@interfaces/Response";
import { NextApiRequest, NextApiResponse } from "next";

// an interface used to help parse the request values when rating a response
interface Rate {
    // the mongoose generated id of the response being rated
    _id: string;
    // the rating the user has given for the response
    rating: string;
}

// used to get the information to make a rating card or to update (+/-) a resonses rating
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        // get a random response
        const newResponseQuery = await ResponseController.getRandomResponse();
        // the the prompt that matches the id from the retrieved query
        const promptqueryResult = await PromptController.getPrompt(newResponseQuery.promptID);
        // parse our responses
        const newResponse = JSON.parse(JSON.stringify(newResponseQuery)) as CMResponse;
        const newPrompt = JSON.parse(JSON.stringify(promptqueryResult)) as Prompt;
        // assign our return values from our retrieved responses
        const responseId = newResponse._id;
        const tags = newResponse.tags;
        const response = newResponse.response;
        const prompt = newPrompt.prompt;

        // build response that matches RateCard Interface
        res.status(200).json({
            responseId,
            prompt,
            response,
            tags
        });
    } 
    else if (req.method === 'PUT') {        
        const { body } = req;
        const { _id, rating }: Rate = body;
        // rate the response that matches the given id
        const response = await ResponseController.rateResponse(_id, (rating == "true"));
        
        res.status(200).json(response);
    }
}