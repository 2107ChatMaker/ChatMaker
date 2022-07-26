//react imports
import { NextApiRequest, NextApiResponse } from "next";
//data access objects
import { ResponseController } from "@/dataAccessLayer/actions/response";
//interfaces
import { CMResponse } from "@interfaces/Response";

interface Data  {
    promptID: string,
    retrievedIDs: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "POST") {
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
        } else if(req.method == "GET"){

            console.log("getting request")
            const promptID: string = String(req.query.promptID)
            const retrievedIDs = req.query.retrievedIDs

            // const parsedIDs = JSON.parse(retrievedIDs[0])
            
            // const test = data as Data
            // const {body} = req;
            // const {promptID, retrievedIDs} = req.query.data;
            console.log('promptID ', promptID)
            console.log('retrievedID ', retrievedIDs)

            // let retrievedIDs: string[] = [];
            let retrievedResponses: CMResponse[] = []
            // let returnResult = {
            //     retrievedIDs: retrievedIDs,
            //     retrievedResponses: retrievedResponses
            // }

            for (let i = 0; i <= 10; i++) {
                // get a random response from the backend and parse it
                const queryResult = await ResponseController.getRandomResponse(retrievedIDs as [string]);
                const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
                retrievedIDs.push(String(newResponse._id))
                retrievedResponses.push(newResponse)
            }
            //getting all the responses associated with the given promptID
            //const responses = await ResponseController.getApprovedResponsesByID(promptID);
            // console.log(responses)
            //sending a message to the user so we know our 'get' request was successful
            // console.log('return result ', returnResult)
            const returnValue = JSON.parse(JSON.stringify(
                retrievedResponses
            ))
            console.log('return value ', returnValue)
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