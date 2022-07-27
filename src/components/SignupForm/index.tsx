//react imports
import { useState } from 'react';
import { useRouter } from 'next/router';

//utils
import useForm from '@utils/hook/useForm';
import axios from '@utils/constants/axios';
import {signupValidation as validation} from '@utils/form/SignupValidation';

//material UI
import { Key, MailOutline } from '@mui/icons-material';

//components
import Input from '@components/Input';
import Button from '@components/Button';
import AuthFormWrapper from '@components/AuthFormWrapper';

//interfaces
import { SignupFormData as FormData } from '@interfaces/SignupFormData';

//custom style
import styles from './SignupForm.module.sass';

export default function SignupForm() {

    //router for navigate to email verification page
    const router = useRouter();

    //state for serverside error
    const [error, setError] = useState<string | null>(null);

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
    }, validation, onSignUp);

    //sign up
    async function onSignUp() {
        const { email, password } = formData;

        try {

            //send signup request
            const response = await axios.post('/api/user/auth/register', {email, password});

            //get user id
            const { _id } = response.data;

            //redirect to email verification page
            router.push(`/auth/verification/email/${_id}`);

        } catch(err) {
            if (err.response) {
                
                //set server side error
                setError(err.response.data.err);
            }
        }
    };
    
    return (
        <AuthFormWrapper>
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
                        error = {
                            errors.email? errors.email:
                            error? error : ""
                        }
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
        </AuthFormWrapper>
    );
}