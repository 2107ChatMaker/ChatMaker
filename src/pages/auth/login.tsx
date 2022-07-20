import Background from "@components/Background";
import styles from "@styles/AuthForm.module.sass";
import NextHead from "@components/NextHead";
import { getSession, signIn } from "next-auth/react";
import LoginForm from "@components/LoginForm";

export default function Login() {
    return (
        <Background>
            <NextHead 
                title="Login" 
                name="Login Page" 
                content="Welcome back! Login to ChatMaker"
            />
            <div className={styles.content}>
                <LoginForm signIn={signIn}/>
            </div>
        </Background>
    );
}

// if(String(error).includes("email is not verified")) {
//     const userId = String(error).split("?")[1];
//     router.push(`/auth/verification/email/${userId}`);
// }

//redirect page to explore if user is already logged in
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const error = context.query.error;
    if (error && String(error).includes("email is not verified")) {
        const userId = String(error).split("?")[1];
        return {
            redirect: {
                destination: `/auth/verification/email/${userId}`,
                permanent: false,
            }
        };
    }
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
