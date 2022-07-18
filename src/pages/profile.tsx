import Page from "@components/templates/Page";
import { getSession, signOut } from 'next-auth/react';
import { Logout } from "@mui/icons-material";
import PageTitle from "@components/PageTitle";
import styles from "@styles/Profile.module.sass";
import Link from "next/link";
import {UserController as userController} from "@/dataAccessLayer/actions/user";
import { ResponseController as responseController } from "@/dataAccessLayer/actions/response";
import { PromptController as promptController } from "@/dataAccessLayer/actions/prompt";
import type { HashMap } from "@interfaces/HashMap";
import SavedResponseList from "@components/SavedResponseList";
import Button from "@components/Button";
import { useState } from "react";
import axios from "@utils/constants/axios";
import { useRouter } from "next/router";

export default function Profile({user, savedResponses, savedResponsesIds}: HashMap) {

  //list of selected saved responses
  const [selectedResponses, setSelectedResponses] = useState([]);

  //user id and email
  const { id: uid, email } = user;

  //handle selecting response 
  const handleSelect = (_id: string, isSelected: boolean) => {

    //if response is selected/checked
    if (isSelected) {

      //add response to selected responses list
      const res = selectedResponses.concat(_id);
      setSelectedResponses(res);
    } else {
      // if not remove it from the selected responses list
      setSelectedResponses(selectedResponses.filter(id => id !== _id));
    }
  };

  //handle deleting selected responses
  const handleDelete = async () => {
    try {

        //check if there is any selected response
        if (selectedResponses.length > 0) {
            
            //delete selected responses from user saved responses
            const deletedResponses = savedResponsesIds.filter(response => selectedResponses.includes(response._id));
            const { data } = await axios.put(`/api/user/${uid}/response/delete`, {responseIDs: deletedResponses});
            if (data.error) {
                throw new Error(data.error);
            }
        }
    } catch(error) {
        //TODO: handle error
    }
  };

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
            <h2 className={styles.favoriteTitle}>
                Saved
            </h2>
            <div className={styles.action}>
                <div className={styles.btn}>
                    <Button type="button">
                        Export To JSON
                    </Button>
                </div>
                <div className={styles.btn}>
                    <Button type="button" variant="alert" onClick={handleDelete}>
                        Delete Selected
                    </Button>
                </div>
            </div>
        </div>
        {savedResponses.length > 0 &&
        <div className={styles.responses}>
            {Object.keys(savedResponses).map((prompt, index) => (
                <SavedResponseList key={index} prompt={savedResponses[prompt]} title={prompt} onSelect={handleSelect}/>
            ))}
        </div>}
      </div>
    </Page>
  );
}

//redirect page to login if user is not logged in and get list of user's saved responses
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session && session.user) {

        //get user save responses ids
        const saveResponsesIds: string[] = await userController.getSavedResponses(session.user.id);

        //get saved responses by ids
        const savedResponses = await responseController.getResponsesByIds(saveResponsesIds);

        //group responses by prompt
        let groupedResponses = await groupResponse(savedResponses);

        return {
          props: {
            user: JSON.parse(JSON.stringify(session.user)),
            savedResponses: JSON.parse(JSON.stringify(groupedResponses)),
            savedResponsesIds: JSON.parse(JSON.stringify(saveResponsesIds))
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

//group responses by prompt
const groupResponse = async (responses) => {
    let groupedResponses = {};
    if (responses.length > 0) {
        for (let i = 0; i< responses.length; i++) {
            const response = responses[i];
            const { prompt } = await promptController.getPrompt(response.promptID);
            if (groupedResponses[prompt]) {
                groupedResponses[prompt].push(response);
            } else {
                groupedResponses[prompt] = [response];
            }
        }
    }
    return groupedResponses;
};