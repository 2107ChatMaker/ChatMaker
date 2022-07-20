//react imports
import { NextApiRequest, NextApiResponse } from "next";
//utils
import { sendPasswordConfirmation } from "@utils/mailing/SendEmail";
import { generateToken } from "@utils/token/Token";
import { hash } from 'bcrypt';
//data access object
import { UserController } from "@/dataAccessLayer/actions/user";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "POST") {
            
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
                const passwordResetToken = generateToken(user._id.toString());

                //set password reset token to user
                user.resetPassword.resetPasswordToken = passwordResetToken;

                //set provisional password
                user.resetPassword.provisionalPassword = await hash(newPassword, 10);

                //update user in database with provisional password and reset password token
                await user.save();

                //send user id as response
                res.status(200).json({ _id: user._id.toString() });

                //send password reset verification link to user email
                sendPasswordConfirmation(user.email, passwordResetToken, user._id);
            }
        } else {
            throw {
                code: 400,
                message: "Invalid method"
            };
        }
    } catch (error) {
        const { code = 500, message='internal server error' } = error;
        res.status(code).json({ err: message });
    }
}