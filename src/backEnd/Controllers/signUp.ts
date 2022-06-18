import { databaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";
import { User } from "./user";
/**
 * Saves Sign Up information to be passed to MongoDB
 */
export class SignUp extends User implements databaseObject{
    // password given by user
    readonly password: String;

    constructor(userName: String, email: String, password: String) {
        super(userName, email);

        // validation may make more sense to be in controller
        // needs additional password validation
        if (password.length < 5 || password.length > 15) {
            throw new Error('Password is not valid');
        }

        // needs to be salted and hashed
        this.password = password;
    }

    // converts username, password, and email to a hashmap
    toHashMap(): HashMap {
        return {
            userName: this.userName,
            password: this.password,
            email: this.email
        }
    }
}