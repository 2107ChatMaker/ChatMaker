import Template from "@components/templates/Verification";
import styles from "@styles/VerificationPage.module.sass";
import Button from "@components/Button/Button";
import { useRouter } from "next/router";
import { axiosInstance as axios } from "@utils/constants/axios";
import { useState } from 'react';

export default function PasswordVerification() {
    const router = useRouter();
    const {_id} = router.query;
    const [error, setError] = useState();

    async function resendLink() {
        try {
            //send password verification link to email
            await axios.post(`/api/user/auth/verification/password`, {id: _id});
        } catch(err) {
            //handle error
            setError(err.response.data.err);
        }
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
                        onClick={() => {
                            router.push("/auth/login");
                        }}
                    >
                        Back To Login
                    </Button>
                </div>
            </div>
        </Template>
    );
}

