import UserModel from "@/dataAccessLayer/schemas/user";
import { verifyToken, generateToken } from "@utils/token/Token";
import { sendEmailVerification } from "@utils/mailing/SendEmail";
import { NextApiRequest, NextApiResponse } from "next";

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
                const user = await UserModel.findById(_id);

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
                        message: "Invalid token or id"
                    };
                }

                //verify user
                user.isVerified = true;
                user.emailToken = null;
                await user.save();
                res.status(200).send("Your email is verified");
                
            } catch {
                throw {
                    code: 400,
                    message: "Invalid id"
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
                const user = await UserModel.findById(_id);
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
                } catch(error) {
                    throw {
                        code: 400,
                        message: "Invalid email"
                    };
                }
                res.status(200).send("email sent");
            } catch(error) {
                throw error;
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