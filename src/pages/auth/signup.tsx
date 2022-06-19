import styles from "@styles/AuthForm.module.sass";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import Background from "@components/Background/Background";
import SignupForm from "@components/SignupForm/SignupForm";
import NextHead from "@components/NextHead";

export default function Signup() {
    return (
        <Background>
            <NextHead
                title="Signup"
                name="Signup Page"
                content="Welcome! Let's get started"
            />
            <div className={styles.content}>
                <AuthFormWrapper>
                    <SignupForm/> 
                </AuthFormWrapper>
            </div>
        </Background>
    );
}