//react imports
import { NextApiRequest, NextApiResponse } from "next";
//data access object
import { PromptController } from "@/dataAccessLayer/controllers/prompt"; 


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if (req.method != "POST") {
            throw {
                code: 405,
                message: "Method not allowed"
            };
        }

        const {prompt, userID} = req.body;
        const isPromptExist = await PromptController.getPromptByContent(prompt);

        if (isPromptExist) {
            throw {
                code: 400,
                message: "prompt already exists"
            };
        }

        const promptController = new PromptController(userID, prompt);
        promptController.save();
        
        res.status(200).json({message: "Prompt added"});        
    } catch(error) {
        const {code = 500, message} = error;
        res.status(code).json({message});
    }
}



