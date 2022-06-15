import connectDatabase from "../../Database/database";
import Prompt from "@/Controllers/Schemas/prompt";


//for when user wants to delete a prompt theyve submitted
export async function deletePrompt(id: string) {
    await connectDatabase();
    //need to add way to get the ID from the prompt when in the app
    //finds the prompt in the database by its ID
    const promptToDelete = await Prompt.find({id: id})
    //removes the prompt from the database 
    await Prompt.deleteOne(promptToDelete);
}

//reference from yudhvirs class lecture 5 
export async function addPrompt(content: string, tag: [], rating: 50){
    await connectDatabase();
    const prompt = new Prompt({
        content,
        tag,
        rating
    });
    return prompt.save();
}



