
/**
 * base User Class
 */
 export class User {
    // Stores The Users Given Name
    readonly userName: String;
    // Stores The Users Email address
    readonly email: String;

    constructor(userName: String, email: String, password: String) {
        this.userName = userName;
        this.email = email;
    }
}