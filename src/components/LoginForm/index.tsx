import { Key, MailOutline} from '@mui/icons-material';
import Input from "@components/Input";
import Button from "@components/Button";
import styles from "./LoginForm.module.sass";
import useForm from '@utils/hook/useForm';
import {loginValidation as validation} from '@utils/form/LoginValidation';
import { LoginFormData as FormData } from '@interfaces/LoginFormData';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthFormWrapper from '@components/AuthFormWrapper';


export default function LoginForm({signIn}) {
    
    //router for getting error from server by query params
    const router = useRouter();

    //server side validation error
    const { error } = router.query;

    //sign in 
    const onSignIn = () => {
        signIn("credentials", { email: formData.email, password: formData.password });
    };

    

    //form state and handlers
    const [
        formData,
        errors,  
        handleChange,
        handleSubmit 
    ] = useForm<FormData>({email: "", password: ""}, validation, onSignIn);
    
    return (
        <AuthFormWrapper>
            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <div className={styles.formTitle}>
                        Welcome back!
                    </div>
                    <div className={styles.input}>
                    <Input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        required={true}
                        error={
                            errors.email? errors.email: 
                            error === "email does not exist"? error:
                            error === "email is not verified"? error:""
                        }
                    >
                        <MailOutline  color='disabled'/>
                    </Input>
                    </div>
                    <div className = {styles.input}>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                            required={true}
                            error={
                                errors.password? errors.password:
                                error === "password is incorrect"? error:""
                            }
                        >
                            <Key color='disabled'/>
                        </Input>
                        <Link href="/auth/reset/password">
                            <a className={styles.resetPassword} href="#">
                                reset password
                            </a>
                        </Link>
                    </div>
                    <div className={styles.formAction}>
                        <Button type={"submit"}>
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </AuthFormWrapper>
    );
}
