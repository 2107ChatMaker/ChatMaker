import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";

const responseSchema = new Schema({
    //response fields
    id: Number,
    userID: Number,
    content: String,
    rating: Number,
    tag: [

    ],
    timesRated: Number,
    reason: String

});

//gets response collection in the database
const Response = models.Response || model('response', responseSchema)

export default Response;