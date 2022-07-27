//react imports
import { NextApiRequest, NextApiResponse } from "next";

//data access objects
import { ResponseController } from "@/dataAccessLayer/actions/response";

//interfaces
import { CMResponse } from "@interfaces/Response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "POST") {

            //gives us JSON body
<<<<<<< HEAD
            const {body} = req;

            //destructuring JSON body to grab what we need
            const {userID, promptID, response, tags} : CMResponse = body;

=======
            const { body } = req;
            //destructuring JSON body to grab what we need
            const { userID, promptID, response, tags } : CMResponse = body;
>>>>>>> origin/main
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
            const {body} = req;
            const {promptID} = body;

            //getting all the responses associated with the given promptID
            const responses = await ResponseController.getApprovedResponsesByID(promptID);

            //sending a message to the user so we know our 'get' request was successful
            res.status(200).json(responses);
        } else {
            throw {
                code: 405,
                message: "method not allowed"
            };    
        };
    } catch(error) {
        const {code = 500, message} = error;
        res.status(code).json({ message });
    };
}