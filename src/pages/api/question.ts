import connectDatabase from "../../backend/actions/database";
import Question from "../../backend/database/Models/Question";


export default async function addQuestion(req, res) {
    try {
        console.log('connecting')
        await connectDatabase();
        //creates the docuemnt in the data case
        const question = await Question.create(req.body)
        res.json({question});
        console.log('added to the database')
    }  catch (error) {
        res.json({error})
    }
}