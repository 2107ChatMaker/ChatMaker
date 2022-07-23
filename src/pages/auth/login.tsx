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
