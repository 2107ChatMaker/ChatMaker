import VerficationTemplate from "@templates/Verification";
import styles from '@styles/VerificationForm.module.sass';
import Button from "@components/Button/Button";
import { axiosInstance as axios } from "@constants/Axios/axios";
import { useRouter } from "next/router";

export default function EmailVerification() {

    //router for getting user id
    const router = useRouter();

    //get user id
    const {_id} = router.query;

    async function sendVerificationEmail() {
        try {
            //send verification email
            await axios.post(`/api/authApi/verification/email/${_id}`);
        } catch(error) {
            //handle error
        }
    }
    
    return (
        <VerficationTemplate>
            <div className={styles.formWrapper}>
                <h1>Verify your email</h1>
                <p>Please check your email to verify your account</p>
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
                        onClick={()=>router.push("/auth/login")}
                    >
                        back to login
                    </Button>
                </div>
            </div>
        </VerficationTemplate>
    );
}