import { Tag } from "@/Utility/Enums/tag";
import { model, models, Schema } from "mongoose";

const responseSchema = new Schema({
    //gets the user id from the person that is responding
    userID:{type: String, required: false},
    promptID: {type: String, required: false},
    //this is the content of the response that the user enters
    //required filed because tall responses must have content
    response: {type: String, required: true},
    //the rating the response has , when it was enough ratings it will be showed publicly 
    //the rating will start at 50 and a thumbs up is a +1 and a thumbs down is -1 
    rating: {type: Number, required: false},
    //tags that the user will be able to add to their response 
    //users will be able to filter through the responses and search by tag 
    //after merge change the type to tag enum
    tags: {type: [Tag], required: true}
});

//gets response collection in the database
const ResponseModel = models.Response || model('Response', responseSchema);

export default ResponseModel;