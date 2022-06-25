import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import {Key, MailOutline} from '@mui/icons-material';
import styles from './SignupForm.module.sass';
import useForm from '@hook/useForm';
import {signupValidation as validation} from '@utils/form/SignupValidation';
import { SignupFormData as FormData } from '@interfaces/SignupFormData';

export default function SignupForm() {

    //form submit function
    const onSubmit = () => {
        //TODO: signup
    };

    //form state and handlers
    const [
        formData, 
        errors, 
        handleChange, 
        handleSubmit
    ]= useForm<FormData>({
        email: '',
        password: '',
        passwordConfirm: ''
    }, validation, onSubmit);
    
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <div className={styles.formTitle}>
                    Welcome!
                </div>
                <div className={styles.input}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        error = {errors.email? errors.email: ""}
                    >
                        <MailOutline color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required={true}
                        error = {errors.password? errors.password: ""}
                        >
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        required={true}
                        error = {errors.passwordConfirm? errors.passwordConfirm: ""}
                        >
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.formAction}>
                    <Button type={"submit"}>
                        Signup
                    </Button>
                </div>
            </div>  
        </form>
    );
}