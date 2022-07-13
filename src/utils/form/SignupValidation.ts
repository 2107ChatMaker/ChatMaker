import { SignupFormData as FormData} from "@interfaces/SignupFormData";

export function signupValidation(formData: FormData): {} {
    
    //erros object to be returned
    let errors = {email: "", password: "", passwordConfirm: ""};
    
    //regex source: https://www.w3resource.com/javascript/form/email-validation.php
    const emailPredicate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //regex source: https://www.w3resource.com/javascript/form/password-validation.php
    const passwordPredicate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    
    if (!emailPredicate.test(formData.email)) {
        errors.email = "Invalid email";
    }

    if (!passwordPredicate.test(formData.password)) {
        errors.password = `Password must be 8-15 characters long, 
                           contain at least one number, one uppercase letter, 
                           one lowercase letter`;
    }

    if (formData.password !== formData.passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match";
    }
    return errors.email !== "" || 
           errors.password !== "" || 
           errors.passwordConfirm !== "" ? errors : {};
}