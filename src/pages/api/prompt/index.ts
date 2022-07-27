//react imports
import { NextApiRequest, NextApiResponse } from "next";

//data access object
import { PromptController } from "@/dataAccessLayer/actions/prompt"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        switch(req.method) {
            case "POST":
                const {prompt, userID} = req.body;
                const isPromptExist = await PromptController.getPromptByContent(prompt);

                //check to see if prompt already exists
                if (isPromptExist) {
                    throw {
                        code: 400,
                        message: "prompt already exists"
                    };
                }

                //create new prompt
                const promptController = new PromptController(userID, prompt);

                //save prompt to database
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



