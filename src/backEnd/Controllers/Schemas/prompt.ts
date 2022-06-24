import { Tag } from "@/Utility/Enums/tag";
import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
    //id is not required we can start it at 0 and increase it whenever there is a new prompt asked
    userID: {type: String, required: false},
    //the content of the question 
    prompt: {type: String, required: true}
}); 

//questions collection in the database
const PromptModel = models.Prompt || model('Prompt', promptSchema);

export default PromptModel;