//react imports
import { NextApiRequest, NextApiResponse } from "next";

//utilities
import { verifyToken, generateToken } from "@utils/token";
import { sendEmailVerification } from "@utils/mailing";

//data access object
import { UserController as userController } from "@/dataAccessLayer/controllers/user";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const { token, _id } = req.query;
            
            //verify token
            if (typeof token !== "string" || typeof _id !== "string" || !verifyToken(token)) {
                throw {
                    code: 400,
                    message: "Invalid token or id"
                };
            }

            try {

                //get user by id
                const user = await userController.getUserByID(_id);

                //check if user has verified
                if (user.isVerified) {
                    throw {
                        code: 400,
                        message: "User already verified"
                    };
                }

                //compare email token
                if (user.emailToken !== token) {
                    throw {
                        code: 400,
                        message: "Invalid token"
                    };
                }

                //verify user
                user.isVerified = true;
                user.emailToken = null;
                await user.save();
                res.status(200).send("Your email is verified");
            } catch(error) {
                const {code = 400, message = "Invalid id"} = error;
                throw {
                    code, message
                };
            }
        } else if (req.method === "POST") {

            //get user id
            const { _id } = req.query;

            //verify user id
            if (typeof _id !== "string") throw {
                code: 400,
                message: "Invalid id"
            };

            try {

                //get user
                const user = await userController.getUserByID(_id);

                //check if user has verified
                if (user.isVerified) {
                    throw {
                        code: 400,
                        message: "User already verified"
                    };

                //check if email token has expired then generate a new one
                } else if (!verifyToken(user.emailToken)) {
                    user.emailToken = generateToken(user.email);
                    await user.save();
                }

                try {
                    await sendEmailVerification(user.email, user.emailToken, _id);
                    res.status(200).send("email sent");
                } catch(error) {
                    const {code = 500, message = "error sending email"} = error;
                    throw {
                        code, message
                    };
                }
            } catch(error) {
                const {code = 400, message = "Invalid id"} = error;
                throw {
                    code, message
                };
            } 
        } else {
            throw {
                code: 405,
                message: "Method not allowed"
            };    
        }
    } catch (err) {
        const { code = 500, message } = err;
        res.status(code).json({ err: message });
    }
}