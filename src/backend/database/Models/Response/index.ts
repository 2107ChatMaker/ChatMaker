import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";


const responseSchema = new Schema({

    id: Number,
    userID: Number,
    content: String,
    rating: Number,
    tag: [

    ],

});

const Response = models.Response || model('response', responseSchema)
export default Response;