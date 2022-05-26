import { User } from "./user";
/**
 * Saves Sign Up information to be passed to MongoDB
 */
export class SignUp extends User{

    // Stores the Salted and Hashed Password
    readonly password: String;

    constructor(userName: String, email: String, password: String) {
        super(userName, email, password);

        // validation may make more sense to be in controller
        // needs additional password validation
        if (password.length < 5 || password.length > 15) {
            throw new Error('Password is not valid');
        }
        // needs to be salted and hashed
        this.password = password;
    }
}