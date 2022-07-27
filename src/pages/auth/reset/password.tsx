//react imports
import { useRouter } from "next/router";
import { useState } from "react";

//utils
import axios from "@utils/constants/axios";
import { signupValidation as validation } from "@utils/form/SignupValidation";
import useForm from "@utils/hook/useForm";

//material UI
import { Mail, Key } from "@mui/icons-material";

//components
import Template from "@components/templates/Verification";
import Button from "@components/Button";
import Input from "@components/Input";

//custom styles
import styles from "@styles/ResetPassword.module.sass";

interface FormData {
    email: string; 
    password: string;
    passwordConfirm: string;
}

export default function ResetPassword() {

    //router for redirect to password verification page
    const router = useRouter();

    //state for serverside error
    const [error, setError] = useState<string | null>(null);

    async function onResetPassword() {
        try {

            //send reset password request
            const response = await axios.post("/api/user/auth/reset/password", {
                email: data.email,
                newPassword: data.password,
            });

            //redirect to password verification page
            router.push(`/auth/verification/password/${response.data._id}`);
        } catch (error) {
            setError(error.response.data.err);
        }
    };

    //form state and handlers
    const [
        data, 
        errors, 
        handleChange, 
        handleSubmit ] = useForm<FormData>(getInitialState(), validation, onResetPassword);
        
    return (
        <Template>
            <form onSubmit={handleSubmit}>
                <div className={styles.wrapper}>
                    <div className={styles.formTitle}>
                        <h1>Reset Password</h1>
                    </div>
                    <div className={styles.form}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            required={true}
                            error = {errors.email?errors.email:
                                error?error:null
                            }
                        >
                            <Mail color='disabled'/>
                        </Input>
                        <Input 
                            type="password"
                            name="password"
                            placeholder="Enter Your new Password"
                            value={data.password}
                            onChange={handleChange}
                            required={true}
                            error = {errors.password?errors.password:null}
                        >
                            <Key color='disabled'/>
                        </Input>
                        <Input
                            type="password"
                            name="passwordConfirm"
                            placeholder="Confirm Your new Password"
                            value={data.passwordConfirm}
                            onChange={handleChange}
                            required={true}
                            error = {errors.passwordConfirm?errors.passwordConfirm:null}
                        >
                            <Key color='disabled'/>
                        </Input>
                        <div className={styles.formAction}>
                            <Button type="submit">
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}

//generate initial form state
const getInitialState = (): FormData => {
    return {
        email: "",
        password: "",
        passwordConfirm: ""
    };
};
