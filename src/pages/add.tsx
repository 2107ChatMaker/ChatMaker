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
    const [form, _, handleChange, handleSubmit] = useForm({prompt : "" }, validatePrompt, onAddPrompt);
    
    return (
        <Page
            headTitle = " add prompt"
            headContent="
            welcome to the chat maker, 
            add prompts. here you can contribute to community by adding a prompt of your own.
            Chat maker is a free, crowdsourced platform for creating, referencing, and sharing 
            prompts and response for ingame dialogues.
            "
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

  // get user session
  const session = await getSession(context);

  //check if user session exists
  if (session && session.user) {

      //caching
      context.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');

      //return user as props
      return {
        props: {
          user: JSON.parse(JSON.stringify(session.user)),
        },
      };
    } else {

        //redirect to login page
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            }
        };
    }
}