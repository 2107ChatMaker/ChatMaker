import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";
import { Saveable } from "./Interfaces/saveable";

// Saves Sign Up information to be passed to MongoDB 
export class SignUp implements DatabaseObject, Saveable{
    // Stores The Users Email address
    readonly email: String;
    // password given by user
    readonly password: String;

    constructor(email: String, password: String) {

        // validation may make more sense to be in controller
        // needs additional password validation
        if (password.length < 5 || password.length > 15) {
            throw new Error('Password is not valid');
        }

        // needs to be salted and hashed
        this.password = password;
    }
    /// Saves this object to the database or update it if it already exists
    save() { 
        // ObjectManager.saveObject(this, SignUp)
    }

    // converts username, password, and email to a hashmap
    toHashMap(): HashMap {
        return {
            password: this.password,
            email: this.email
        }
    }
}