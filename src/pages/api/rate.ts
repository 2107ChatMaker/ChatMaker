//react imports
import { NextApiRequest, NextApiResponse } from "next";

//data access objects
import { PromptController } from "@/dataAccessLayer/controllers/prompt";
import { ResponseController } from "@/dataAccessLayer/controllers/response";
import { UserController } from "@/dataAccessLayer/controllers/user";

//interfaces
import { Prompt } from "@interfaces/Prompt";
import { CMResponse } from "@interfaces/Response";


// an interface used to help parse the request values when rating a response
interface Rate {

    // the mongoose generated id of the response being rated
    responseID: string;

    // the rating the user has given for the response
    rating: string;

    // the id of the currently logged in user
    userID: string
}

// used to get the information to make a rating card or to update (+/-) a resonses rating
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {

            // gets the userID passed in the url
            const userID = String(req.query.userID);

            if (!userID) {
                throw {
                    code: 400,
                    message: 'username does not exist'
                };
            }

            // retrieved user that matches associated user id
            const user: UserController = await UserController.getUserByID(userID);

            if (!user) {
                throw {
                    code: 400,
                    message: 'user does not exist'
                };
            }

            // get a random response
            const newResponseQuery = await ResponseController.getRandomResponse(user.responsesRated);
 
            // assign default return values
            let responseId = "";
            let tags = [];
            let response = "";
            let prompt = "";
            console.log('newResponseQuery', JSON.stringify(newResponseQuery));

            // if response exists
            if (!!newResponseQuery) {

                // the the prompt that matches the id from the retrieved query
                const promptqueryResult = await PromptController.getPrompt(newResponseQuery.promptID);

                // parse our responses
                const newResponse = JSON.parse(JSON.stringify(newResponseQuery)) as CMResponse;
                const newPrompt = JSON.parse(JSON.stringify(promptqueryResult)) as Prompt;

                // assign our return values from our retrieved responses
                responseId = newResponse._id as string;
                tags = newResponse.tags;
                response = newResponse.response;
                prompt = newPrompt.prompt;
            } else {

                // assign default values when user has rated every response
                response = "you've rated all responses!\ntry creating a response of your own!";
                prompt = "Wow You Are Amazing";
            }
            
            // build response that matches RateCard Interface
            res.status(200).json({
                responseId,
                prompt,
                response,
                tags
            });
        
        } else if (req.method === 'PUT') {
            const { body } = req;
            const { responseID, rating, userID }: Rate = body;

            if (!responseID || responseID == null || !rating || rating == null || !userID || userID == null) {
                throw {
                    code: 400,
                    message: 'missing values'
                };
            }

            // get user values
            let userValues: UserController = await UserController.getUserByID(userID);

            if (!userValues.responsesRated.includes(responseID)) {

                // add response id to the uservalues
                userValues.responsesRated.push(responseID);

                // create a new controller to properlly cast the data
                const user = new UserController(userValues);

                // update the current user with the response id given
                user.update();
            }

            // rate the response that matches the given id
            const response = await ResponseController.rateResponse(responseID, (rating == "true"), userID);
            res.status(200).json(response);
        } else {
            throw {
                code: 405,
                message: 'only POST an GET are allowed'
            };
        }
    } catch(error) {
        const {code = 500, message} = error;
        res.status(code).json({message});
    }
}