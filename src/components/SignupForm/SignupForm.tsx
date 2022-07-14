import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import {Key, MailOutline, Router} from '@mui/icons-material';
import styles from './SignupForm.module.sass';
import useForm from '@hook/useForm';
import {signupValidation as validation} from '@utils/form/SignupValidation';
import { SignupFormData as FormData } from '@interfaces/SignupFormData';
import { axiosInstance as axios } from '@constants/Axios/axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
            const response = await axios.post('/api/authAPI/register', {email, password});

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
    );
}