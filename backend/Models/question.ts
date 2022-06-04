import { model, models, Schema } from "mongoose";

const questionSchema = new Schema({
    //id is not required we can start it at 0 and increase it whenever there is a new 
    //question asked
    id: {type: Number, required: false},
    //the content of the question 
    content: {type: String, required: true},
    //have a selection of tags for the user to choose from
    tag: {type: [], required: true}

}); 



//questions collection in the database
const Question = models.Question || model('question', questionSchema);

export default Question;