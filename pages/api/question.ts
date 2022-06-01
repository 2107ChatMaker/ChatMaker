import connectDatabase from "../../backend/actions/database";
import Question from "../../backend/Models/Question";

export default async function addQuestion(req, res) {
    try {
        console.log('connecting')

        //connects to the database
        await connectDatabase();

        //creates the docuemnt in the data base
        const question = await Question.create(req.body)

        //responds wit the question asked
        res.json({question});

    }  catch (error) {

        res.json({error})
    }
}