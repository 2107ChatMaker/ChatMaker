import { PromptController } from "@/dataAccessLayer/actions/prompt"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        switch(req.method) {
            case "POST":
                const {prompt, userID} = req.body;
                const promptController = new PromptController(userID, prompt);
                promptController.save();
                res.status(200).json({message: "Prompt added"});
                break;
            default:
                throw {
                    code: 405,
                    message: "Method not allowed"
                };
        }
            
    } catch(error) {
        const {code = 500, message} = error;

        res.status(code).json({message});
    }
}



