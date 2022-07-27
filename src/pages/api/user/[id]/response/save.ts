//react imports
import { NextApiRequest, NextApiResponse } from "next";

//data access object
import { UserController } from "@/dataAccessLayer/controllers/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            throw {
                code: 405,
                message: "method not allowed"
            };
        } else {
            
            //grabbing the user id
            const { id } = req.query;

            //check to see if id is valid
            if (typeof id !== "string" || !id) {
                throw {
                    code: 400,
                    message: "invalid id"
                };
            }

            //get user by id
            const user = await UserController.getUserByID(id);

            //checking to see if user exists
            if (!user) {
                throw {
                    code: 404,
                    message: "user not found"
                };
            } else {

                //grabbing the responseId from the request body
                const { responseID } = req.body;
                
                //checking to see if response id is valid
                if (!responseID || typeof responseID !== "string") {
                    throw {
                        code: 400,
                        message: "invalid responseID"
                    };
                } else {
                    
                    //checking to see if the response is already saved for this specific user
                    if (!user.responsesSaved.includes(responseID)) {

                        //pushing the response ID we were given to the responsesSaved array
                        await user.responsesSaved.push(responseID);

                        //making sure the user is saved properly
                        user.save();
                        res.status(200).json({ message: "Response saved" });
                    } else {
                        res.status(200).json({ message: "response already saved to profile!" });    
                    }
                }
            }
        } 
    } catch(error) {
        const {code = 500, message="Internal server error"} = error;
        res.status(code).json({message});
    }
}






