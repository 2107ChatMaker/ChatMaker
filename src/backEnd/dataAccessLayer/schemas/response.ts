//mongoose imports
import { model, models, Schema } from "mongoose";


const responseSchema = new Schema({
    // the user id of the respsonse maker
    userID: {type: String, required: false},
    // the id of the prompt that the response was made for
    promptID: {type: String, required: false},
    // the given response to be rated or retrieved
    response: {type: String, required: true, unique: true},
    // the rating for the response used to determine if the response should be saved permanently
    rating: {type: Number, required: false},
    // tags used to give context to the responses
    tags: {type: [String], required: true}
});

//gets response collection in the database
const ResponseModel = models.Response || model('Response', responseSchema);

export default ResponseModel;