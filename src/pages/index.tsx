//react imports
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Image from 'next/image';

//utils
import axios from '@utils/constants/axios';

//material UI
import { CircularProgress, Icon, useMediaQuery } from "@mui/material";

//components
import Page from '@components/templates/Page';
import PageTitle from '@components/PageTitle';
import SearchBar from '@components/SearchBar';

//data access object
import { PromptController } from '@/dataAccessLayer/controllers/prompt';

//interfaces
import type { HashMap } from '@interfaces/HashMap';
import { Prompt as PromptInterface } from '@interfaces/Prompt';

//custom styles
import styles from '@styles/ExplorePrompts.module.sass';
import dynamic from 'next/dynamic';


export default function Explore({user, retrievedPrompts}: HashMap) {
  const LoadPrompts = dynamic(() => import('@components/Prompt/LoadPrompts'), {

    //will show a blue loading circle while loading in the content
    loading: () => <div><CircularProgress /></div>
  });

  //list of all the prompts being displayed
  const [promptsList, setPrompts] = useState(retrievedPrompts);

  //boolean to check if the screen size matches a mobile screen
  const match = useMediaQuery('(max-width:768px)');

  //router to navigate to the create prompt and respond page
  const router = useRouter();

  //search prompts by user input 
  const onSearch = async (search: string) => {
    try{

      //if the search is empty, set the prompts to the original prompts
      if(search ===  "") {
        setPrompts(retrievedPrompts);
      } else {

        //fetches the results from the search query
        const {data} = await axios.get(`/api/prompt/search/${search}`);
        setPrompts(data.reverse());
      } 
    } catch(error){
        alert(`${error.response.data.message}, please try agan later`);
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
        <div className={styles.header} >
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
                  placeholder={"Search for prompts..."}
              />
            </div>
        </div>
        <LoadPrompts retrievedPrompts={retrievedPrompts} prompts={promptsList} setPrompts={setPrompts}/>
      </div>
    </Page>
  );
}

//redirect page to login if user is not logged in
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (session && session.user) {

        //declaring an array to hold all the response IDs we've already gotten
        //an array to hold all of the responses we will show
        let retrievedPrompts: PromptInterface[] = [];
        const queryResult = await PromptController.getPrompts(0);
        const newPrompt = JSON.parse(JSON.stringify(queryResult));
        retrievedPrompts = newPrompt;
        
        //const prompts = await pController.getPrompts();
        return {
          props: {
            user: JSON.parse(JSON.stringify(session.user)),

            //prompts: JSON.parse(JSON.stringify(prompts.reverse())),
            retrievedPrompts: retrievedPrompts
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


