import { databaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

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
    /// Saves this object to the database or update it if it already exists
    save() { 
        // ObjectManager.saveObject(this, Login)
    }
     findAll() {
         throw new Error("Method not implemented.");
     }
     find() {
         throw new Error("Method not implemented.");
     }

    toHashMap(): HashMap {
        return {
            email: this.email,
            password: this.password
        }
    }
}