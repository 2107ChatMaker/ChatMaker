import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@/dataAccessLayer/actions/user";
import { generateToken, verifyToken } from "@utils/token/Token";
import { sendPasswordConfirmation } from "@utils/mailing/SendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //user enter email -> get user -> get new password -> send email -> redirect to login
    try {
        if (req.method == "POST") {
            const { email, newPassword } = req.body;
            const user = await UserController.getUserByEmail(email);
            if (!user) {
                throw {
                    code: 400,
                    message: "email does not exist"
                };
            } else {
                const passwordResetToken = generateToken(user._id);
                user.resetPassword.resetPasswordToken = passwordResetToken;
                user.resetPassword.provisionalPassword = newPassword;
                await user.save();
                res.status(200).json({ message: "send password confirmation" });
                sendPasswordConfirmation(user.email, passwordResetToken, user._id);
            }
        } else if (req.method == "GET") {
            const { token, id } = req.query;
            if (typeof token === "string" && typeof id === "string" && verifyToken(token)) {
                try {
                    const user = await UserController.getUserByID(id);
                    if (user.resetPassword.resetPasswordToken === token) {
                        UserController.resetPassword(id, user.resetPassword.provisionalPassword, token);
                    }
                } catch(error) {
                    throw {
                        code: 400,
                        message: "Invalid token or id"
                    };
                }
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