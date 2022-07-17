import styles from '@styles/ExplorePrompts.module.sass';
import Page from '@components/templates/Page';
import Image from 'next/image';
import { Icon } from "@mui/material";
import PageTitle from '@components/PageTitle';
import { useMediaQuery } from '@mui/material';
import {useRouter} from 'next/router';
import SearchBar from '@components/SearchBar';
import Prompt from '@components/Prompt';
import { PromptController as pController } from '@/dataAccessLayer/actions/prompt';
import { getSession } from 'next-auth/react';
import type { HashMap } from '@interfaces/HashMap';

export default function Explore() {


  const match = useMediaQuery('(max-width:768px)');
  const router = useRouter();

  return (
    <Page
      headTitle="explore prompts"
      headName="explore prompts"
      headContent="explore prompts"
    >
       <div className={styles.page}>
            <PageTitle title = {match? "Explore": "Explore Prompts"}>
                <div className={styles.add} onClick={() => router.push("/add")}>
                    <h2>
                        Add
                    </h2>
                    <Icon fontSize='large' sx={{color: "#1C98EC"}}>
                        <Image src={"/resources/PencilSquare.svg"} width={"100%"} height={"100%"} alt="Logo"/>
                    </Icon>
                </div>
            </PageTitle>
            <div className={styles.searchField}>
                <SearchBar onSubmit={() => {}}
                    placeholder={"search for prompts"}
                />
            </div>
            <div className={styles.prompts}>
              {prompts && prompts.map(({prompt, _id}, index) => (
                <Prompt key={index} prompt={prompt}/>
              ))}
            </div> 
        </div>
    </Page>
  );
}

//redirect page to login if user is not logged in
export async function getServerSideProps(context) {

  const session = await getSession(context);
  if (session && session.user) {
      const prompts = await pController.getPrompts();
      return {
        props: {
          user: JSON.parse(JSON.stringify(session.user)),
          prompts: JSON.parse(JSON.stringify(prompts))
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


