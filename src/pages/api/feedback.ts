import { model } from "mongoose";
import connectDatabase from "../../backend/actions/database";
import Feedback from "../../backend/database/Models/Feedback";


export default async function addFeedback(req, res) {
    try {
        console.log('connecting')
        await connectDatabase();
        const feedback = await Feedback.create(req.body)
        res.json({feedback});
    }  catch (error) {
        res.json({error})
    }
}