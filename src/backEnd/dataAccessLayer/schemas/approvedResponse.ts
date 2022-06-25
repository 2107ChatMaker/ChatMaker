import { model, models, Schema } from "mongoose";

const approvedResponseSchema = new Schema({
    // the user id of the respsonse maker
    userID:{type: String, required: false},
    // the id of the prompt that the response was made for
    promptID: {type: String, required: false},
    // the given response to be rated or retrieved
    response: {type: String, required: true},
    // tags used to give context to the responses
    tags: {type: [String], required: true}
});

//gets response collection in the database
const ApprovedResponseModel = models.ApprovedResponse || model('Approvedresponse', approvedResponseSchema)

export default ApprovedResponseModel;