import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import Background from "@components/Background/Background";
import SignupForm from "@components/SignupForm/SignupForm";
import styles from "@styles/AuthForm.module.sass";

export default function Signup() {
    return (
        <Background>
            <div className={styles.content}>
                <AuthFormWrapper>
                    <SignupForm/> 
                </AuthFormWrapper>
            </div>
        </Background>
    )
}