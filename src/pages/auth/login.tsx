import Background from "@components/Background/Background";
import LoginForm from "@components/LoginForm/LoginForm";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import styles from "@styles/AuthForm.module.sass";

export default function Login() {
    return (
        <Background>
            <div className={styles.content}>
                <AuthFormWrapper>
                    <LoginForm/>
                </AuthFormWrapper>
            </div>
        </Background>
    )
}