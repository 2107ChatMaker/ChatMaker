import CreatePrompt from '@components/CreatePromptForm/CreatePromptForm';
import Page from '@components/Templates/Page';
// eslint-disable-next-line camelcase
import {getSession} from 'next-auth/react';

export default function AddPrompt() {
    return (
        <Page
            headTitle = "Add Prompt"
            headContent= "add prompt page"
            headName= "add prompt"
        >
            <CreatePrompt/>
        </Page>  
    );
}

//redirect page to login if user is not logged in
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session && session.user) {
      return {
        props: {
          user: JSON.parse(JSON.stringify(session.user)),
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