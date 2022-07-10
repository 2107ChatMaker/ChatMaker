import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
    // id of the user who made the prompt
    userID: {type: String, required: false},
    // the prompt written by the user to give context to future responses 
    prompt: {type: String, required: true, unique: true}
}); 

//questions collection in the database
const PromptModel = models.Prompt || model('Prompt', promptSchema);

export default PromptModel;