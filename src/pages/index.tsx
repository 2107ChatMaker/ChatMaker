//react imports
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
//utils
import axios from '@utils/constants/axios';
//material UI
import { Icon, useMediaQuery } from "@mui/material";
//components
import Page from '@components/templates/Page';
import PageTitle from '@components/PageTitle';
import SearchBar from '@components/SearchBar';
import Prompt from '@components/Prompt';
//data access object
import { PromptController as pController } from '@/dataAccessLayer/actions/prompt';
//interfaces
import type { HashMap } from '@interfaces/HashMap';
//custom styles
import styles from '@styles/ExplorePrompts.module.sass';


export default function Explore({user, prompts}: HashMap) {
  //list of all the prompts being displayed
  const [promptsList, setPrompts] = useState(prompts);
  //boolean to check if the screen size matches a mobile screen
  const match = useMediaQuery('(max-width:768px)');
  //router to navigate to the create prompt and respond page
  const router = useRouter();

  //search prompts by user input 
  const onSearch = async (search: string) => {
    try{

      //if the search is empty, set the prompts to the original prompts
      if(search ===  ""){
        setPrompts(prompts);
      } else{
        //fetches the results from the search query
        const {data} = await axios.get(`/api/prompt/search/${search}`);
        setPrompts(data.reverse());
      }
    }
      catch(error){
        //TODO: handle error
      }
  };

  return (
    <Page
      headTitle=" explore prompts"
      headContent="
      welcome to the chat maker explore page, 
      explore prompts. here you can find prompts for game development.
      Chat maker is a free, crowdsourced platform for creating, referencing, and sharing 
      prompts and response for ingame dialogues.
      "
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
                <SearchBar onSubmit={onSearch}
                    placeholder={"search for prompts"}
                />
            </div>
            <div className={styles.prompts}>
              {promptsList && promptsList.length > 0? promptsList.map(({prompt, _id}, index) => (
                <Prompt key={index} prompt={prompt} onClick={()=>router.push(`/response/${_id}`)}/>
              )): <div className={styles.noPrompts}>No prompts found</div>}
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
          prompts: JSON.parse(JSON.stringify(prompts.reverse()))
        },
      };
  } else {
      return {
        redirect: {
            destination: "/auth/login",
            permanent: false,
        }
    };
  }
}


