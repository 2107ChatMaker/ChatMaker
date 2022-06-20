import { Schema, model, models } from "mongoose";

const feedbackSchema = new Schema({
    // gets the responseid from the response the feedback is given to
    responseID:{type: String, required: false},
    // the _id of the user that is giving the feedback
    userID: {type: String, required: false},
    // the rating the user gives the response
    rating: {type: Boolean, required: true}
});

//feedback collection in the database
const FeedbackModel = models.Feedback || model('Feedback', feedbackSchema);

export default FeedbackModel;