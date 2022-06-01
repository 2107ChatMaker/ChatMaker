import { model } from "mongoose";
import connectDatabase from "../../backend/actions/database";
import Feedback from "../../backend/Models/Feedback";

export default async function addFeedback(req, res) {
    try {
        console.log('connecting')

        //connects to the database
        await connectDatabase();
        
        //creats a object in the database
        const feedback = await Feedback.find()

        //returns the feedback that was entered 
        res.json({feedback});

    }  catch (error) {

        //returns the error that was caught 
        res.json({error})
    }
}