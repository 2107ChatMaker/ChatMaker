//react imports
import { NextApiRequest, NextApiResponse} from "next";

//data access object
import { PromptController as controller } from "@/dataAccessLayer/controllers/prompt";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if (req.method != "GET") {
            throw{
                code: 405,
                message: "Method Not Allowed"
            };
        }
        const {search} = req.query;

        //check to see if search is valid 
        if (typeof search !== "string") {
            throw{
                code: 400,
                message: "Bad Request"
            };
        }

        //search for prompts
        const prompts = await controller.searchPrompts(search);
        res.status(200).json(prompts);  

    } catch(error) {
        const {code = 500, message} = error;
        res.status(code).json({message});
    }
}

