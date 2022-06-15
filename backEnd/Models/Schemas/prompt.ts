import { Tag } from "@/Utility/Enums/tag";
import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
    //id is not required we can start it at 0 and increase it whenever there is a new prompt asked
    id: {type: Number, required: false},
    //the content of the question 
    content: {type: String, required: true},
    //have a selection of tags for the user to choose from
    tag: {type: [Tag], required: true},

    rating: {type: Number, required: false}

}); 



//questions collection in the database
const Prompt = models.Prompt || model('prompts', promptSchema);

export default Prompt;