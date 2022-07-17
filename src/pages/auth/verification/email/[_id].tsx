import VerficationTemplate from "@components/templates/Verification";
import styles from '@styles/VerificationPage.module.sass';
import Button from "@components/Button/Button";
import { axiosInstance as axios } from "@utils/constants/axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EmailVerification() {

    //router for getting user id and navigate to login page
    const router = useRouter();

    //get user id
    const {_id} = router.query;
    
    const [error, setError] = useState(null);

    //send verification email to user
    async function sendVerificationEmail() {
        try {
            //send verification email
            await axios.post(`/api/user/auth/verification/email/${_id}`);
        } catch(err) {
            //handle error
            setError(err.response.data.err);
        }
    }

    //redirect to login page
    const toLogin = () => {
        router.push("/auth/login");
    };
    
    return (
        <VerficationTemplate>
            <div className={styles.wrapper}>
                <h1>Verify your email</h1>
                <p>Please check your email to verify your account</p>
                { error && 
                <div className={styles.error}>
                    {error}
                </div>}
                <div>
                    <Button
                        type="button"
                        onClick={sendVerificationEmail}
                    >
                        Resend Link
                    </Button>
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={toLogin}
                    >
                        back to login
                    </Button>
                </div>
            </div>
        </VerficationTemplate>
    );
}