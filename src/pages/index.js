import styles from '../styles/Home.module.sass';
import Background from '@components/Background/Background';
import Navbar from '@components/Navbar/Navbar';
import NextHead from '@components/NextHead';

export default function Home() {
  return (
    <Background>
      <div className={styles.container}>
        
        <NextHead 
          title="Explore"
          content="Explore all the prompts"
          name="Explore"
        />

        <Navbar />
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
    </Background>
  );
}
