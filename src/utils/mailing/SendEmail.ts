import nodemailer from 'nodemailer';

export async function sendEmailVerification(email: string, token: string, userId: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
            clientId: process.env.NODEMAILER_CLIENTID,
            clientSecret: process.env.NODEMAILER_CLIENTSECRET,
            refreshToken: process.env.NODEMAILER_REFRESHTOKEN,
        }
    });

    const mailOptions = {
        from: 'ChatMaker no-reply <noreply@chatmaker.com>',
        to: email,
        subject: 'Email Verification',
        html: `<h1>Welcome to Chat Writer</h1>
        <p>Please click on the following link to verify your email:</p>
        <a href="${process.env.BASEURL}/api/authAPI/verify/email/${userId}?token=${token}">Verify your email</a>`
    };

    try { 
        await transporter.sendMail(mailOptions); 
    } 
    catch (error) {
        throw {
            code: 500,
            message: "Error sending email verification"
        };
    }
}
