import { model, models, Schema } from "mongoose";

//user mongoose schema
const userSchema = new Schema({

    //user email
    email: {
        type: String,
        required: true,
        unique: true
    }, 

    //user email is verified status
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },

    //email verification token
    emailToken: {
        type: String,
    }, 
    
    //user password
    password: {
        type: String,
        required: true
    },
    
    //reset password 
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
        },

        //expiration date for reset password token
        resetPasswordExpiration: {
            type: Date,
            default: null
        }
    },

    //list of saved response ids
    savedResponses: {
        type: [{
            type: String
        }],
        default: []
    }
    
});

//build user model from schema
const UserModel = models.User || model('User', userSchema);
export default UserModel;