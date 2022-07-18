import { ResponseController } from "@/dataAccessLayer/actions/response"
import { NextApiRequest, NextApiResponse } from "next"
import { CMResponse } from "@interfaces/Response";
import {User} from '@interfaces/User'
import { UserController } from "@/dataAccessLayer/actions/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        if (req.method == "POST") {
            //gives us JSON body
            const {body} = req;
            //destructuring JSON body to grab what we need
            const {userID, promptID, response, tags} : CMResponse = body;
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
        } else if (req.method == "PUT") {
            //grabbing the body from the request
            const {body} = req;
            //extracting the data we want to use
            const {userID, responseID} = body
            //grabbing the user object so we can add the responses
            const user: UserController = await UserController.getUserByID(userID)
            //checking to see if the response is already saved for this specific user
            if (!user.responsesSaved.includes(responseID)) {
                //pushing the response ID we were given to the responsesSaved array
                await user.responsesSaved.push(responseID)
                //updating the user
                await user.update()
                //making sure the user is saved properly
                user.save();
                //logging so we know our save is successful
                console.log("Response Saved")
                res.status(200).json({message: "Response saved"});
            } else {
                //if we already have it, we won't save it again
                console.log('response already saved')
                res.status(200).json({message: "response already saved to profile!"})
            }
            
        }
        else {
            throw {
                code: 405,
                message: "method not allowed"
            };
        };
    }
    catch(error) {
        const {code = 500, message} = error;

        res.status(code).json({message});
    };
  };
