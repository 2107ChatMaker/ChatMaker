import { databaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";

/**
 * Login Object for querying mongoDB Login
 */
 export class Login implements databaseObject {
    // Stores The Users Given Name
    readonly email: String;
    // Stores The Users Email address
    readonly password: String;

    constructor(email: String, password: String) {

        // TODO validation may make more sense to be in controller
        // needs additional password validation
        if (password.length < 5 || password.length > 15) {
            throw new Error('Password is not valid');
        }
        
        this.email = email;
        this.password = password;
    }

    toHashMap(): HashMap {
        return {
            email: this.email,
            password: this.password
        }
    }
}