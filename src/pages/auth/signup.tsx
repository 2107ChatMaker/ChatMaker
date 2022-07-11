import styles from "@styles/AuthForm.module.sass";
import AuthFormWrapper from "@components/AuthFormWrapper/AuthFormWrapper";
import Background from "@components/Background/Background";
import SignupForm from "@components/SignupForm/SignupForm";
import NextHead from "@components/NextHead";
import { getSession } from "next-auth/react";

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