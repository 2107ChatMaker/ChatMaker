import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});

const UserModel = models.User || model('User', userSchema);
export default UserModel;