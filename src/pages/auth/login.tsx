//react imports
import { getSession, signIn } from "next-auth/react";
//components
import Background from "@components/Background";
import NextHead from "@components/NextHead";
//custom styles
import styles from "@styles/AuthForm.module.sass";
//next
import dynamic from "next/dynamic";

export default function Login() {

    //code splitting, lazy loading for lagin form
    const LoginForm = dynamic(() => import("@components/LoginForm"),{
        loading: () => <h1 style={{color: "white", textAlign: "center", marginTop: "30%"}}>...loading</h1>
      });
    
    return (
        <Background>
            <NextHead 
                title="Welcome back to chatmaker"  
                content="
                Welcome back! Login to chat maker or create an account.
                Create an account to start responding to prompts and create your own prompts.
                Chat maker is a free, crowdsourced platform for creating, referencing, and sharing 
                prompts and response for ingame dialogues.
                "
            />
            <div className={styles.content}>
                <LoginForm signIn={signIn}/>
            </div>
        </Background>
    );
}

//redirect page to explore if user is already logged in
export async function getServerSideProps(context) {
    //caching
    context.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
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
