import Background from "@components/Background/Background";
import LoginForm from "@components/LoginForm/LoginForm";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import styles from "@styles/AuthForm.module.sass";
import NextHead from "@components/NextHead";

export default function Login() {
    return (
        <Background>
            <NextHead 
                title="Login" 
                name="Login Page" 
                content="Welcome back! Login to ChatMaker"
            />
            <div className={styles.content}>
                <AuthFormWrapper>
                    <LoginForm/>
                </AuthFormWrapper>
            </div>
        </Background>
    );
}