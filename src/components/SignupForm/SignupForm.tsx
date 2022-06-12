import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import {Key, MailOutline} from '@mui/icons-material';
import styles from './SignupForm.module.sass';
import useForm from '@hook/useForm';

export default function SignupForm() {
    
    const onSubmit = () => {
        console.log("register success");
    }
    
    const validation = (formData) => {
        let errors = {email: "", password: "", passwordConfirm: ""};
        const emailPredicate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordPredicate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        
        if (!emailPredicate.test(formData.email)) {
            errors.email = "Invalid email";
        }

        if (!passwordPredicate.test(formData.password)) {
            errors.password = `Password must be 8-15 characters long, 
                               contain at least one number, one uppercase letter, 
                               one lowercase letter`;
        }

        if(formData.password !== formData.passwordConfirm) {
            errors.passwordConfirm = "Passwords do not match";
        }
        return errors;
    }

    const [formData, errors, handleChange, handleSubmit] = useForm({email: "", password: "", passwordConfirm: ""},validation, onSubmit);
    
    
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
<<<<<<< HEAD
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        error = {errors.email? errors.email: ""}
=======
                        required={true}
>>>>>>> fb599f5 (update signup&login form)
                    >
                        <MailOutline color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
<<<<<<< HEAD
                        value={formData.password}
                        onChange={handleChange}
                        required={true}
                        error = {errors.password? errors.password: ""}
                        >
=======
                        required={true}>
>>>>>>> fb599f5 (update signup&login form)
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.input}>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
<<<<<<< HEAD
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        required={true}
                        error = {errors.passwordConfirm? errors.passwordConfirm: ""}
                        >
=======
                        required={true}>
>>>>>>> fb599f5 (update signup&login form)
                        <Key color='disabled'/>
                    </Input>
                </div>
                <div className={styles.formAction}>
                    <Button type={"submit"}>
<<<<<<< HEAD
                        Signup
=======
                        Login
>>>>>>> fb599f5 (update signup&login form)
                    </Button>
                </div>
            </div>  
        </form>
    )
}