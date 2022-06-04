import { model, models, Schema } from "mongoose";

const responseSchema = new Schema({
    //id of the response can start at 0 and then go up as there is a new one
    id: {type: Number, required: false},
    //gets the user id from the person that is responding
    userID:{type: Number, required: false},
    //this is the content of the response that the user enters 
    //required filed because tall responses must have content
    content: {type: String, required: true},
    //the rating the response has , when it was enough ratings it will be showed publicly 
    rating: {type: Number, required: false},
    //tags that the user will be able to add to their response 
    //users will be able to filter through the responses and search by tag 
    //after merge change the type to tag enum
    tag: {type: [], required: true},
    //how many times the question was rated
    timesRated: {type: Number, required: false},
    //when the rating is below too give the user an option to say why they gave it a low rating
    reason: {type: [], required: false},

});

//gets response collection in the database
const Response = models.Response || model('response', responseSchema)

export default Response;