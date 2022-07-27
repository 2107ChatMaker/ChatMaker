//react imports
import { NextApiRequest, NextApiResponse } from "next";

//utils
import { sendEmailVerification } from "@utils/mailing";

//database
import Database from "@/database";

//data access object
import { UserController as userController} from "@/dataAccessLayer/actions/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email , password } = req.body;

    try {
        if (req.method === "POST") {

            //wait for the database connection
            await Database.setupClient();

            //check if user already exists
            try {

                //register user
                const user = await userController.register(email.toLowerCase(), password);

                try {
                    
                    //send email verification
                    await sendEmailVerification(email.toLowerCase(), user.emailToken, user._id);

                    //send user id as response
                    res.status(201).json({
                        message: "account created",
                        _id: user._id.toString()
                    });
                } catch {
                    throw {
                        code: 500,
                        message: "cannot send email"
                    };
                }
            } catch {
                throw {
                    code: 400,
                    message: "Email already exists"
                };
            }
        } else {
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