
import { Schema, model, models } from "mongoose";

const feedbackSchema = new Schema({

    //id is not required we can start it at 0 and increase it whenever there is new 
    //feedback given
    id: {type: Number, required: false},
    //the email of the person giving the feedback which is get fetched from the user
    //when they give feedback
    email: {type: String, required: false},
    //gets the responseid from the response the feedback is given to
    responseID:{type: Number, required: false},
    userID: {type: Number, required: false},
    //the rating the user gives the response
    rating: {type: Number, required: true},

    prompt: {type: String, required: false},
    

});

//feedback collection in the database
const Feedback = models.Feedback || model('feedback', feedbackSchema);

export default Feedback;