import Page from '@components/templates/Page';
import styles from '@styles/Add.module.sass';
import { HashMap } from '@interfaces/HashMap';
// eslint-disable-next-line camelcase
import useForm from '@hook/useForm';
import TextArea from '@components/TextArea';
import Button from '@components/Button';
import {getSession} from 'next-auth/react';
import UserModel from '@/dataAccessLayer/schemas/user';

export default function AddPrompt({user}: HashMap) {


    const onAddPrompt = () => {
        console.log(user);
    };
    
    const validatePrompt = ({prompt}) => {

        if (prompt.length < 10) {
            return {
                prompt: "Prompt must be at least 10 characters long"
            };
        }
        return {};
    }

    const [form, errors, handleChange, handleSubmit] = useForm({prompt : "" }, validatePrompt, onAddPrompt);

    return (
        <Page
            headTitle = "Add Prompt"
            headContent= "add prompt page"
            headName= "add prompt"
        >
           <form onSubmit={handleSubmit}>
            <div className ={styles.page}>
                <div className={styles.pageTitle}>
                    Create a new prompt
                    
                </div>
                    <TextArea
                        value={form.prompt}
                        onChange={handleChange}
                        placeholder="Enter your prompt here"
                        require={true}
                        name="prompt" 
                    />
                <div className={styles.formAction}>
                    <Button type="submit" >
                        Create
                    </Button>
                </div>
                <div className={styles.guidelinesTitle}>
                    Rules for submission:
                </div>
                <div className={styles.guidelines}>
                    <ul className={styles.rules}>
                        <li>Do not post anything offensive</li>
                        <li>The submission must make sense</li>
                        <li>Be respectful</li>
                    </ul>
                    <p className={styles.warning}>
                        Failure to observe any of these rules may result in a permanent ban
                        from this service. Thank you for your contribution to the community.    
                    </p>
                </div>
            </div>
        </form>
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