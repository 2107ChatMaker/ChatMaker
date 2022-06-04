import connectDatabase from "../../backEnd/actions/database";
import User from "../../backEnd/Models/user";

export default async function addUser(req, res) {
    try {
        console.log('connecting')
        
        //connecting to database
        await connectDatabase();

        //adding user object ot the data
        const user = await User.create(req.body)

        //responds with the user object
        res.json({user});

    }  catch (error) {

        res.json({error})
    }
}