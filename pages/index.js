import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      
      <Head>
        <title>ChatMaker</title>
        <meta name="description" content="Generated by ChatMaker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
			
			<header>
				<h1>
					This is the header BB!
				</h1>
			</header>
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
  )
}
