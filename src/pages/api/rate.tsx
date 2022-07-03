import { ResponseController } from "@/dataAccessLayer/actions/response";
import { NextApiRequest, NextApiResponse } from "next";

interface Rate {
    _id: string;
    rating: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const response = await ResponseController.getRandomResponse();
        // console.log("anout to map response : \n" + response)
        // console.log(response)
        res.status(200).json(response);
    } 
    else if (req.method === 'PUT') {        
        const { body } = req;
        const { _id, rating }: Rate = body;
        console.log("rating: ", rating)
        console.log("rating bool: ", (rating == "true"))
        const response = await ResponseController.rateResponse(_id, (rating == "true"));
        console.log("the response: \n", response)
        res.status(200).json(response);
    }

    // if (req.method === 'POST') {
    //     const { body } = req;
    //     const { userID, promptID, response, tags }: ResponseController = body;

    //     const retunResponse = new ResponseController(userID, promptID, response, tags);

    //     retunResponse.save();

    //     res.status(200).json(retunResponse);

    // } else if (req.method === 'GET') {
    //     // const ssList = await getSSList("");

    //     // res.status(200).json(ssList);

    // } else {
    //     res.status(400).send('Unsupported method type');
    // }
}