import Prompt from "@/Controllers/Schemas/prompt";
import ApprovedPrompt from "@/Controllers/Schemas/approvedPrompt";
import Database from "../../Database/database";

//moves the approved item from database to approved database
export default async function approvedPromptRatings(){
    await Database.setupClient();
    //searches the database to find all the prompts that have a rating above of 70
    const approved = await Prompt.find({rating: { $gte: 70 }})
    //stores all the found rprompts in the approved list array so it can be moved to the approved databse
    const approvedList = approved;
    await ApprovedPrompt.insertMany(approvedList)
    //deletes those prompt from the previous collection
    await Prompt.deleteMany(approvedList)

}