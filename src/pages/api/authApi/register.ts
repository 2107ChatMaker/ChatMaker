import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt';
import Database from "@/Database/database";
import User from "@/dataAccessLayer/schemas/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email , password }: {email: string, password: string} = req.body;
    try {

        if (req.method !== "POST") {
            throw {
                code: 405,
                message: "Method not allowed"
            };
        }

        //wait for the database connection
        await Database.setupClient();
        
        try {
            //check if user already exists
            const user = new User({
                email,
                password: await hash(password, 10)
            });
            await user.save();
        } catch (error) {
            throw {
                code: 400,
                message: "Email already exists"
            };
        }

    } catch(err: any) {
        const {code = 500, message} = err;
        res.status(code).json({err: message});
    }
}