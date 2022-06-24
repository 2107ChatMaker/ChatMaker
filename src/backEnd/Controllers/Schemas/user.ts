import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    //creates the username when the user signs up and it is kept with their id
    username:  {type: String, required: true},
    //the password of the user only returned at sign up and login 
    password: {type: String, required: true},
    //users email
    email: {type: String, required: true}
});

//gets response collection in the database
const UserModel = models.User || model('User', userSchema);

export default UserModel;