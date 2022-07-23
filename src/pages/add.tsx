//react imports
import { getSession } from 'next-auth/react';
import useForm from '@hook/useForm';
//utils
import axios from '@utils/constants/axios';
//components
import Page from '@components/templates/Page';
import TextArea from '@components/TextArea';
import Button from '@components/Button';
import PageTitle from '@components/PageTitle';
//interfaces
import { HashMap } from '@interfaces/HashMap';
//custom styles
import styles from '@styles/Add.module.sass';

export default function AddPrompt({user}: HashMap) {
    const onAddPrompt = async () => {
        //get userID from session
        const userId = user.id;
    
        try{
            //fetch request to add prompt
            const result = await axios.post('/api/prompt', {userId, prompt: form.prompt});
            // alert users upload was successful
            alert(result.data.message);
        } catch (error) {
            //TODO: handle error
            alert(`${error.response.data.message}, please try agan later`);
        }
    };

    //validates the prompt entered by the user
    const validatePrompt = ({prompt}) => {
        //prompt length must be at least 10 characters
        if (prompt.length < 10) {
            return {
                prompt: "Prompt must be at least 10 characters long"
            };
        }

        return {};
    };

    //create prompt form state and form handling methods
    const [form, errors, handleChange, handleSubmit] = useForm({prompt : "" }, validatePrompt, onAddPrompt);
    
    return (
        <Page
            headTitle = "Add Prompt"
            headContent= "add prompt page"
            headName= "add prompt"
        >
           <form onSubmit={handleSubmit}>
            <div className ={styles.page}>
             <PageTitle title = "Create Prompt" />
             <div className={styles.formInput}>
                    <TextArea
                        value={form.prompt}
                        onChange={handleChange}
                        placeholder="Enter your prompt here"
                        require={true}
                        name="prompt" 
                    />
             </div>
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