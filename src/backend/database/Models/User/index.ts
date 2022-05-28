import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    id: Number,
    username: String,
    password: String,
    email: String,
});

const User = models.User || model('user', userSchema);

export default User;

