import { LoginFormData as FormData } from '@interfaces/LoginFormData';


export function loginValidation(formData: FormData): {} {
    
    //erros object to be returned
    let errors = {email: "", password: ""};

    //regex source: https://www.w3resource.com/javascript/form/email-validation.php
    const emailPredicate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //regex source: https://www.w3resource.com/javascript/form/password-validation.php
    const passwordPredicate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

    if (!emailPredicate.test(formData.email)) {
        errors.email = "Invalid email";
    }

    if (!passwordPredicate.test(formData.password)) {
        errors.password = "wrong password";
    }
    
    return errors.email !== "" || errors.password !== "" ? errors : {};
}