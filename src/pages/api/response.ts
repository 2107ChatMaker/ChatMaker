import connectDatabase from "../../backend/actions/database";
import Response from "../../backend/database/Models/Response";


export default async function addResponse(req, res) {
    try {
        console.log('connecting')
        await connectDatabase();
        const response = await Response.create(req.body)
        res.json({response});
    }  catch (error) {
        res.json({error})
    }
}