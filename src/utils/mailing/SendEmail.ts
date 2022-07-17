import sgMail from '@sendgrid/mail';

export async function sendEmailVerification(email: string, token: string, userId: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email, 
        from: 'chatmakers2107@gmail.com', 
        subject: 'verify your email',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Welcome to Chat Writer</h1>
                <p>Please click on the following link to verify your email:</p>
                <a href="${process.env.BASEURL}/api/user/auth/verification/email/${userId}?token=${token}">Verify your email</a>`
    };
    await sgMail.send(msg);
    return;
}

export async function sendPasswordConfirmation(email: string, token: string, userId: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email, 
        from: 'chatmakers2107@gmail.com', 
        subject: 'Confirm your password change',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Welcome to Chat Writer</h1>
               <p>Please click on the following link to confirm your password change:</p>
               <a href="${process.env.BASEURL}/api/user/auth/verification/password/${userId}/${token}">confirm your password change</a>`
    };
    await sgMail.send(msg);
    return;
}