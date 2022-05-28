import connectDatabase from "../../backend/actions/database";
import User from "../../backend/database/Models/User";


export default async function addUser(req, res) {
    try {
        console.log('connecting')
        await connectDatabase();
        const user = await User.create(req.body)
        res.json({user});
    }  catch (error) {
        res.json({error})
    }
}