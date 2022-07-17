import { HashMap } from "@interfaces/HashMap";
import { Saveable } from "@interfaces/Saveable";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { ObjectManager } from "./objectManager/objectManager";
import { User } from "@interfaces/User";
import UserModel from "../schemas/user";

// actions accessable to manipulate responses or add new ones
export class UserController implements DatabaseObject, Saveable, User {
    // the id given to the user by mongo
    readonly _id: string;
    // the users email address
    readonly email: string;
    // defines if the users account has been validated
    readonly isVerified: boolean;
    // the generated email token
    readonly emailToken: string;
    // the users password for logging in
    readonly password: string;
    // the temp password assigned when resetting the password
    readonly resetPassword;
    // list of rated response ids
    responsesRated: [string?];
    // list of saved response ids
    responsesSaved: [string?];
    
    constructor(user: UserController) {
        this._id = user._id;
        this.email = user.email;
        this.isVerified = user.isVerified;
        this.emailToken = user.emailToken;
        this.password = user.password;
        this.resetPassword = user.resetPassword;
        this.responsesRated = user.responsesRated;
        this.responsesSaved = user.responsesSaved;
    }
    
    /// Saves this object to the database or update it if it already exists
    save() { 
        ObjectManager.saveObject(this, UserModel);
    }

    // gets updates the user with the 
    update() {
        return ObjectManager.updateByID(this._id, this, UserModel);
    }

    // gets all users that belong to the given (id)
    static async getUserByID(userID: string) {
        return await ObjectManager.find(UserModel, userID);
    }

    // gets all users that belong to the given (email)
    static async getUserByEmail(email: string) {
        return await ObjectManager.findByEmail(UserModel, email);
    }

    //get user saved responses
    static async getSavedResponses(userID: string) {
        const user = await UserController.getUserByID(userID);
        return user.responsesSaved;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            email: this.email,
            isVerified: this.isVerified,
            emailToken: this.emailToken,
            password: this.password,
            resetPassword: this.resetPassword,
            responsesRated: this.responsesRated,
            responsesSaved: this.responsesSaved
	    };
    }
}