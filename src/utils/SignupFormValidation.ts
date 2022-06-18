import { SignupFormData as FormData} from "@interfaces/SignupFormData";

export function signupValidation (formData: FormData): FormData {
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

    if (formData.password !== formData.passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match";
    }
    return errors;
}