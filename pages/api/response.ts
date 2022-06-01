import connectDatabase from "../../backend/actions/database";
import Response from "../../backend/Models/Response";

export default async function addResponse(req, res) {
    try {
        console.log('connecting')

        //connecting to the database
        await connectDatabase();

        //creats a response object 
        const response = await Response.create(req.body)

        //responds with the response entered
        res.json({response});

    }  catch (error) {

        res.json({error})
    }
}