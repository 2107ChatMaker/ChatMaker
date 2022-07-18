import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method==="POST") {
            
        } else {
            throw {
                code: 405,
                message: "method not allowed"
            };
        }
    } catch(error) {
        const {code=500, message="Internal Server Error"} = error;
        res.status(code).json({message});
    }
}