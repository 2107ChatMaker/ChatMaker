//react imports
import { getSession } from "next-auth/react";
//components
import Background from "@components/Background";
import NextHead from "@components/NextHead";
import SignupForm from "@components/SignupForm";
//custom styles
import styles from "@styles/AuthForm.module.sass";


export default function Signup() {
    return (
        <Background>
            <NextHead
                title="Signup"
                name="Signup Page"
                content="Welcome! Let's get started"
            />
            <div className={styles.content}>
                <SignupForm/> 
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