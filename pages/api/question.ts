import connectDatabase from "../../backEnd/actions/database";
import Question from "../../backEnd/Models/question";

export default async function addQuestion(req, res) {
    try {
        console.log('connecting')

        //connects to the database
        await connectDatabase();

        //creates the docuemnt in the data base
        const question = await new Question()

        //responds with the question asked
        res.json({question});

    }  catch (error) {

        res.json({error})
    }
}