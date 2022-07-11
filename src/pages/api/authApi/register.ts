import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt';
import Database from "@/Database/database";
import User from "@/dataAccessLayer/schemas/user";
import { sendEmailVerification } from "@utils/mailing/SendEmail";
import { generateToken } from "@utils/token/Token";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email , password }: {email: string, password: string} = req.body;
    try {

        switch(req.method) {

            case "POST":
                //wait for the database connection
                await Database.setupClient();

                //check if user already exists
                try {
                    const user = new User({
                        email,
                        password: await hash(password, 10),
                        emailToken: generateToken(email),
                    });
                    await user.save();

                    res.status(201).json({
                        message: "account created",
                        _id: user._id.toString()
                    });

                    //send email verification
                    await sendEmailVerification(email, user.emailToken, user._id.toString());

                } catch (error) {
                    throw {
                        code: 400,
                        message: "Email already exists"
                    };
                }
                break;
            default:
                throw {
                    code: 400,
                    message: "Method not allowed"
                };
            }

    } catch(err: any) {
        const {code = 500, message} = err;
        res.status(code).json({err: message});
    }
}