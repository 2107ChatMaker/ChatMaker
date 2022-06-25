import Background from "@components/Background/Background";
import LoginForm from "@components/LoginForm/LoginForm";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import styles from "@styles/AuthForm.module.sass";
import NextHead from "@components/NextHead";
import { getSession, signIn } from "next-auth/react";

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
                    <LoginForm signIn={signIn}/>
                </AuthFormWrapper>
            </div>
        </Background>
    );
}

//redirect page to explore if user is already logged in
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session && session.user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        };
    }
    return {
        props: {},
    };
}
