//react imports
import { getSession } from "next-auth/react";
//components
import Background from "@components/Background";
import NextHead from "@components/NextHead";
//custom styles
import styles from "@styles/AuthForm.module.sass";
//next
import dynamic from "next/dynamic";

export default function Signup() {

    //code splitting, lazy loading for signup form
    const SignupForm = dynamic(() => import("@components/SignupForm"), {
        loading: () => <h1 style={{color: "white", textAlign: "center", marginTop: "30%"}}>...loading</h1>
    });
    
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
    //caching
    context.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
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