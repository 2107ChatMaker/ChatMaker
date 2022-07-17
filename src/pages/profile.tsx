import Page from "@components/Templates/Page";
import { useRouter } from "next/router";
import { getSession, signOut } from 'next-auth/react';
import { Logout } from "@mui/icons-material";
import PageTitle from "@components/PageTitle";
import styles from "@styles/Profile.module.sass";
import Link from "next/link";
import {UserController as userController} from "@/dataAccessLayer/actions/user";
import { ResponseController as responseController } from "@/dataAccessLayer/actions/response";
import { PromptController as promptController } from "@/dataAccessLayer/actions/prompt";
import { HashMap } from "@interfaces/HashMap";

export default function Profile({user, savedResponses}: HashMap) {
  
  const router = useRouter();
  
  const { id, email } = user;
  
  return (
    <Page
        headTitle="Profile Page"
        headContent="Profile page"
        headName="Profile Page"
    >
      <div className={styles.content}>
        <div className={styles.profile}>
            <PageTitle title="Profile">
                <div className={styles.logOut} onClick={()=>signOut()}>
                    <h2>Logout</h2>
                    <Logout sx={{color: "#1C98EC", paddingRight: "0.25rem"}} fontSize="large"/>
                </div>
            </PageTitle>
            <div className={styles.info}>
                <h1 className={styles.label}>
                    Email
                </h1>
                <div className={styles.email}>
                    {email}
                </div>
                <Link href={"/auth/reset/password"}>
                    <a className={styles.link}>
                        Reset Password
                    </a>
                </Link>
            </div>
        </div>
        <hr className={styles.hr}/>
        <div className={styles.favorite}>
            <h2>
                Saved Responses
            </h2>
        </div>
        <div className={styles.responses}>
            { savedResponses }
        </div>
      </div>
    </Page>
  );
}

//redirect page to login if user is not logged in and get list of user's saved responses
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session && session.user) {

        //get user save responses
        const saveResponsesIds: string[] = await userController.getSavedResponses(session.user.id);
        const saveResponses = await responseController.getResponsesByIds(saveResponsesIds);
        let groupedResponses = [];
        if (saveResponses.length > 0) {
            groupedResponses = saveResponses.reduce(async (acc, curr) => {
                const { promptID } = curr;
                const { prompt } = await promptController.getPrompt(promptID);
                if (!acc[prompt]) {
                    acc[prompt] = [];
                }
                acc[prompt].push(curr);
                return acc;
            });
        }
        return {
          props: {
            user: JSON.parse(JSON.stringify(session.user)),
            savedResponses: JSON.parse(JSON.stringify(groupedResponses))
          },
        };
    }
    return {
        redirect: {
            destination: "/auth/login",
            permanent: false,
        }
    };
}
  