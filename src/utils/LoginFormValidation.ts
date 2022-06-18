import {LoginFormData as FormData} from '@interfaces/LoginFormData';

export function loginValidation(formData: FormData): FormData {
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