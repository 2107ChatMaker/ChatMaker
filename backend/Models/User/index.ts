import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    //user fields in the schema
    id: Number,
    username: String,
    password: String,
    email: String,
});

//gets response collection in the database
const User = models.User || model('user', userSchema);

export default User;

