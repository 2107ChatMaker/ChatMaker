import { model, models, Schema } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 

    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },

    emailToken: {
        type: String,
    }, 

    password: {
        type: String,
        required: true
    },
    
    resetPassword: {
        provisionalPassword: {
            type: String,
            default: null
        },
        resetPasswordToken: {
            type: String,
            default: null
        },
        resetPasswordExpiration: {
            type: Date,
            default: null
        }
    }
});

const UserModel = models.User || model('User', userSchema);
export default UserModel;