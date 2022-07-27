//react imports
import { NextApiRequest, NextApiResponse } from "next";

//utils
import { sendPasswordConfirmation } from "@utils/mailing";
import { generateToken } from "@utils/token";
import { hash } from 'bcrypt';

//data access object
import { UserController } from "@/dataAccessLayer/controllers/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method != "POST") {
            throw {
                code: 400,
                message: "Invalid method"
            };
        }
            
        //retrieve email and password from request body
        const { email, newPassword } = req.body;

        //get user by email
        const user = await UserController.getUserByEmail(email);

        //check if user exists
        if (!user) {
            throw {
                code: 400,
                message: "email does not exist"
            };
        } else {

            //generate reset password token
            const passwordResetToken = generateToken(user._id);

            //set user provisional password and reset password token
            await UserController.setProvisionalPassword(user._id, await hash(newPassword, 10), passwordResetToken);

            try {
                
                //send password reset email
                await sendPasswordConfirmation(user.email, passwordResetToken, user._id);

                //send user id as response
                res.status(200).json({ _id: user._id });
            } catch {
                throw {
                    code: 500,
                    message: "error sending email"
                };
            }
        } 
    } catch (error) {
        const { code = 500, message='internal server error' } = error;
        res.status(code).json({ err: message });
    }
}