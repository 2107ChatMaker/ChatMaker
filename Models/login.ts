/**
 * Login Object for querying mongoDB Login
 */
 export class Login {
    // Stores The Users Given Name
    readonly email: String;
    // Stores The Users Email address
    readonly password: String;

    constructor(email: String, password: String) {
        this.email = email;

        // validation may make more sense to be in controller
        // needs additional password validation
        if (password.length < 5 || password.length > 15) {
            throw new Error('Password is not valid');
        }
        // needs to be salted and hashed
        this.password = password;
    }
}