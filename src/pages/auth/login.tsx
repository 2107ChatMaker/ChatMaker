import Background from "@components/Background/Background";
import LoginForm from "@components/LoginForm/LoginForm";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import styles from "@styles/AuthForm.module.sass";
import NextHead from "@components/NextHead";
import { getCsrfToken, signIn } from "next-auth/react";

export default function Login({csrfToken}) {
    return (
        <Background>
            <NextHead 
                title="Login" 
                name="Login Page" 
                content="Welcome back! Login to ChatMaker"
            />
            <div className={styles.content}>
                <AuthFormWrapper>
                    <LoginForm signIn={signIn}/>
                </AuthFormWrapper>
            </div>
        </Background>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
          },
    };
}