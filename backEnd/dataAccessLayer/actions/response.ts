import connectDatabase from "../../Database/database";
import Response from "@/Controllers/Schemas/response";

//for when you want to delete a response 
//get the ID from the response when you click delete button
export async function deleteResponse(id: string) {
    //connecting the database
    await connectDatabase();
    //will get the response from the id of the response object that will be deleted
    //*need function to get the id from the response object*/
    //finds that response in the database
    const responseToDelete = await Response.find({id: id})
    //removes the user from the database so their account will be deleted.
    await Response.deleteOne(responseToDelete);
}

export async function addResponse(content: string, tag: []){   
    await connectDatabase();
}

