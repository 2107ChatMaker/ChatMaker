import { Key, MailOutline} from '@mui/icons-material';
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import styles from "./LoginForm.module.sass";
import useForm from '@hook/useForm';
import {loginValidation as validation} from '@utils/form/LoginValidation';
import { LoginFormData as FormData } from '@interfaces/LoginFormData';
import { useRouter } from 'next/router';

export default function LoginForm({signIn}) {
    
    const router = useRouter();

    //server side valiation error
    const { error } = router.query;

    //form submit function
    const onSubmit = () => {
       signIn("credentials", { email: formData.email, password: formData.password });
    };

    //form state and handlers
    const [
        formData, 
        errors, 
        handleChange, 
        handleSubmit
    ] = useForm<FormData>({email: "", password: ""}, validation, onSubmit);
    
    return (
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
                        error === "email does not exist"? error:""
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
                    <a className={styles.resetPassword} href="#">
                    reset password
                </a>
                </div>
                <div className={styles.formAction}>
                    <Button type={"submit"}>
                        Login
                    </Button>
                </div>
            </div>
        </form>
    );
}
