import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import {Key, MailOutline} from '@mui/icons-material';
import styles from './SignupForm.module.sass';

export default function SignupForm() {
    return (
        <form>
            <div className={styles.form}>
                <div className={styles.formTitle}>
                    Welcome!
                </div>
                <div className={styles.input}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required={true}
                    >
                        <MailOutline color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}>
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        required={true}>
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.formAction}>
                    <Button type={"submit"}>
                        Login
                    </Button>
                </div>
            </div>  
        </form>
    )
}