import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const feedbackSchema = new Schema({

    //feedback fields
    id: Number,
    responseID: Number,
    userID: Number,
    rating: Number

});

const Feedback = models.Feedback || model('feedback', feedbackSchema);

export default Feedback;

