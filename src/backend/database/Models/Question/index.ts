import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";


const questionSchema = new Schema({
    //question fields
    id: Number,
    content: String,
    tag: []
}); 


const Question = models.Question || model('question', questionSchema);

export default Question;