//react imports
import { NextApiRequest, NextApiResponse } from "next";
//data access object
import { Prompt } from "@interfaces/Prompt";
import { PromptController } from "@/dataAccessLayer/controllers/prompt"; 


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {

        if (req.method === "POST") {
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
        } 
        else if (req.method === "GET") {
            let { skip } = req.query;
            let skipNum = parseInt(skip as string)


            let retrievedPrompts: Prompt[] = [];

            const queryResult = await PromptController.getPrompts(skipNum);
                
            const newPrompt = JSON.parse(JSON.stringify(queryResult)) as Prompt;
            retrievedPrompts.push(newPrompt);

            const returnValue = JSON.parse(JSON.stringify(
                {
                retrievedPrompts
                }
            ));

            res.status(200).json(returnValue);


        }
        else {
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



