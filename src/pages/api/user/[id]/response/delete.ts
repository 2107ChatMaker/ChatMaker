//react imports
import { NextApiRequest, NextApiResponse } from "next";

//data access object
import { UserController as uController} from "@/dataAccessLayer/actions/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        if (typeof id !== "string") {
            throw {
                status: 400,
                message: "invalid id"
            };
        }

        if (req.method === "GET") {

            //get user saved responses ids
            const savedResponses = uController.getSavedResponses(id);
            res.status(200).json(savedResponses);
        } else if (req.method === "PUT") {
            const { responseIDs } = req.body;

            //update user saved responses ids
            await uController.updateSavedResponses(id, responseIDs);
            res.status(200).json({message: "updated saved responses"});
        } else {
            throw {
                status: 405,
                message: "Method not allowed"
            };
        }
    } catch(error) {
        const {code=500, message="Internal server error"} = error;
        res.status(code).json({message});
    }
}