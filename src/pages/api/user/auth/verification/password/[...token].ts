import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@/dataAccessLayer/actions/user";
import { verifyToken } from "@utils/token/Token";
import { sendPasswordConfirmation } from "@utils/mailing/SendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "GET") {

            //retrieve userId and reset password token from request query
            const [id, token] = req.query.token as string[];

            //check if id and token are valid
            if (typeof token === "string" && typeof id === "string" && verifyToken(token)) {

                //check if user exists
                try {

                    //get user by id
                    const user = await UserController.getUserByID(id);

                    //check if user's token matches the token in the request query
                    if (user.resetPassword.resetPasswordToken === token) {
                       //set user password to provisional password
                       user.password = user.resetPassword.provisionalPassword;

                       //clear provisional password and reset password token
                       user.resetPassword.resetPasswordToken = null;
                       user.resetPassword.provisionalPassword = null;

                       //update user in database
                       await user.save();
                    }
                    res.status(200).json({ message: "password reset" });
                } catch(error) {
                    throw {
                        code: 400,
                        message: "Invalid id"
                    };
                }
            } else {
                throw {
                    code: 400,
                    message: "Invalid token or id"
                };
            }
        } else if (req.method==="POST") {

            //retrieve user id from request query
            const { id } = req.body;

            //get user by id
            const user = await UserController.getUserByID(id);

            //check if user exists
            if (user) {
                //send password confirmation link to user email
                sendPasswordConfirmation(user.email, user.resetPassword.resetPasswordToken, user._id);
                res.status(200).json({ message: "send password confirmation" });
            } else {
                throw {
                    code: 400,
                    message: "Invalid id"
                };
            }
        } else {
            throw {
                code: 400,
                message: "Invalid method"
            };
        }
    } catch(error) {
        const { code = 500, message } = error;
        res.status(code).json({ err: message });
    }
}