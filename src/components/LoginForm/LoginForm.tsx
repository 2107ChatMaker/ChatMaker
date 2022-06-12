import { Key, MailOutline} from '@mui/icons-material';
import Input from "@components/Input/Input"
import Button from "@components/Button/Button"
import styles from "./LoginForm.module.sass"
import useForm from '@hook/useForm';

export default function LoginForm(props) {
    const onSubmit = () => {
        console.log("log in success");
    }

    const validation = (formData) => {
        let errors = {email: "", password: ""};
        const emailPredicate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordPredicate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

        if (!emailPredicate.test(formData.email)) {
            errors.email = "Invalid email";
        }

        if (!passwordPredicate.test(formData.password)) {
            errors.password = "wrong password";
        }
        return errors;
    }

    const [formData, errors, handleChange, handleSubmit] = useForm({email: "", password: ""}, validation, onSubmit);
    
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
<<<<<<< HEAD
                    value={formData.email}
                    required={true}
                    error={errors.email? errors.email: ""}
=======
                    value={data.email}
                    required={true}
>>>>>>> fb599f5 (update signup&login form)
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
<<<<<<< HEAD
                        value={formData.password}
                        required={true}
                        error={errors.password? errors.password: ""}
=======
                        value={data.password}
                        required={true}
>>>>>>> fb599f5 (update signup&login form)
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
    )
}
