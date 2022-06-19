import styles from '@styles/Home.module.sass';
import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

export default function Home() {
  return (
    <Background>
      <ContentWrapper>
        <div className={styles.container}>
          <NextHead 
            title="Explore"
            content="Explore all the prompts"
            name="Explore"
          />
          <NavBar />
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
        </ContentWrapper>
    </Background>
  );
}
