//mongoose imports
import { model, models, Schema } from "mongoose";


//user mongoose schema
const userSchema = new Schema({

    //user email
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 

    //user email verification status
    isVerified: {
        type: Boolean, 
        required: true, 
        default: false
    },

    //email verification token
    emailToken: {
        type: String
    }, 
    
    //user password
    password: {
        type: String, 
        required: true
    },
    
    resetPassword: {
        
        //placeholder for new password
        provisionalPassword: { 
            type: String, 
            default: null 
        },

        //token to confirm password reset
        resetPasswordToken: { 
            type: String, 
            default: null 
        }
    },

    //list of saved response ids
    responsesSaved: {
         type: [String], 
         default: [] 
        },

    //list of saved response ids
    responsesRated: { 
        type: [String], 
        default: [] 
    }
});

//user collection in the database
const UserModel = models.User || model('User', userSchema);

export default UserModel;