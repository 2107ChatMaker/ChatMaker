import { Key, MailOutline} from '@mui/icons-material';
import Input from "@components/Input/Input"
import Button from "@components/Button/Button"
import styles from "./LoginForm.module.sass"
import {useState} from 'react'

export default function LoginForm(props) {
    const [data, setData] = useState({email: "", password: ""});
    
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
                    value={data.email}
                    required={true}
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
                        value={data.password}
                        required={true}
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
