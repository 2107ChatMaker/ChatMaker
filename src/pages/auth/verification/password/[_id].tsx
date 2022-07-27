//react imports
import { useRouter } from "next/router";
import { useState } from 'react';

//utils
import axios from "@utils/constants/axios";

//components
import Template from "@components/templates/Verification";
import Button from "@components/Button";

//custom styles
import styles from "@styles/VerificationPage.module.sass";

//next-auth
import { signOut, useSession } from "next-auth/react";

export default function PasswordVerification() {

    //router for getting user id and navigate to login page
    const router = useRouter();

    //get user id
    const { _id } = router.query;

    //server side error
    const [error, setError] = useState();

    //user session
    const {data: session} = useSession();

    //resend password confirmation email
    async function resendLink() {
        try {

            //send password verification link to email
            await axios.post(`/api/user/auth/verification/password`, {id: _id});
        
        } catch(err) {

            //handle error
            setError(err.response.data.err);
        }
    }

    //redirect to login and logged out user after password is reset
    function exitToLogin() {
        
        //check if user is logged in
        if (session && session.user) signOut();
        router.push("/auth/login");
    }
    
    return (
        <Template>
            <div className={styles.wrapper}>
                <div>
                    <h1>Confirm Your Password Change</h1>
                </div>
                <div className={styles.message}>
                    <p>
                        please check your email to confirm your password change
                    </p>
                </div>
                { error && 
                <div className={styles.error}>
                    {error}
                </div>}
                <div>
                    <Button type="button" onClick={resendLink}>
                        Resend Link
                    </Button>
                </div>
                <div>
                    <Button type="button"
                        onClick={exitToLogin}
                    >
                        Back To Login
                    </Button>
                </div>
            </div>
        </Template>
    );
}

