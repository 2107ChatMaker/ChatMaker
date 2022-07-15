import styles from '@styles/Home.module.sass';
import Page from '@components/templates/Page';
// eslint-disable-next-line camelcase
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <Page
      headTitle="explore prompts"
      headName="explore prompts"
      headContent="explore prompts"
    >
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Chat Maker
            </h1>
            <p className={styles.description}>
              This is the index page. 
            </p>
          </main>
          <footer className={styles.footer}>
            <h1>
              This is the footer BB!
            </h1>
          </footer>
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


