//react imports
import { NextApiRequest, NextApiResponse } from "next";
//data access objects
import { ResponseController } from "@/dataAccessLayer/controllers/response";
//interfaces
import { CMResponse } from "@interfaces/Response";
import { ApprovedResponseController } from "@/dataAccessLayer/controllers/approvedRating";

interface Data  {
    promptID: string,
    retrievedIDs: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            //gives us JSON body
            const { body } = req;
            //destructuring JSON body to grab what we need
            const { userID, promptID, response, tags } : CMResponse = body;
            //check if response with same content for this prompt exists
            const isResponseExist = await ResponseController.getResponseByContentAndPrompt(response, promptID);
            if (isResponseExist) {
                throw {
                    code: 400,
                    message: "Response already exist"
                };
            }
            //creating a response controller object
            const newResponse = new ResponseController(userID, promptID, response, tags); 
            //saving the new response we made
            newResponse.save();
            //letting user know the response was successful
            res.status(200).json({message: "Response added"});

        } else if(req.method === "GET"){
            const {promptID, retrivedIDs} = req.query;

            const idString: string = retrivedIDs as string;
            let newRetrievedIDs: string[] = idString.split(',');
            let retrievedResponses: CMResponse[] = [];

            for (let i = 0; i < 10; i++) {
                // get a random response from the backend and parse it
                const queryResult = await ApprovedResponseController.getRandomResponse(newRetrievedIDs as [string], promptID as string);
                if (queryResult == null) {
                    break;
                }
                const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
                newRetrievedIDs.push(String(newResponse._id));
                retrievedResponses.push(newResponse);
            }

            const returnValue = JSON.parse(JSON.stringify(
                {
                retrievedResponses,
                newRetrievedIDs
                }
            ));

            res.status(200).json(returnValue);

        } else {
            throw {
                code: 405,
                message: "method not allowed"
            };
        };
    }
    catch(error) {
        const {code = 500, message} = error;
        res.status(code).json({ message });
    };
  };