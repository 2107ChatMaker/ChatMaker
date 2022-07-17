import Page from '@components/templates/Page';
// eslint-disable-next-line camelcase
import { getSession } from 'next-auth/react';

export default function Profile({user}: {[key: string]: any}) {
    
    return (
        <Page
            headTitle = "Profile"
            headName = "Profile"
            headContent = "Profile"
        >
            <div>
                <h1>Profile</h1>
                <p>This is Profile page</p>
            </div>            
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