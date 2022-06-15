import { model, models, Schema } from "mongoose";

const approvedpromptSchema = new Schema({
    //id is not required we can start it at 0 and increase it whenever there is a new prompt asked
    id: {type: Number, required: false},
    //the content of the question 
    content: {type: String, required: true},
    //have a selection of tags for the user to choose from
    tag: {type: [], required: true},

    rating: {type: Number, required: false}

}); 



//questions collection in the database
const ApprovedPrompt = models.Prompt || model('prompts', approvedpromptSchema);

export default ApprovedPrompt;