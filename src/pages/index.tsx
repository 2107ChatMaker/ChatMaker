import styles from '@styles/Home.module.sass';
import Page from '@templates/Page';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const {data: session, status: loading} = useSession();
  useEffect(()=> {
    if(session) {
      console.log(session);
    }
  },[session]);
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