import connectDatabase from "../../Database/database";
import Response from "@/Controllers/Schemas/response";
import ApprovedResponse from "@/Controllers/Schemas/approvedResponse";
import Database from "../../Database/database";

//moves the approved item from database to approved database
export default async function approvedResponseRatings(){
    await Database.setupClient();
    //searches the database to find all the responses that have a rating above of 70
    const approved = await Response.find({rating: { $gte: 70 }})
    //stores all the found responses in the approved list array so it can be moved to the approved databse
    const approvedList = approved;
    await ApprovedResponse.insertMany(approvedList)
    //deletes those responses from the previous collection
    await  Response.deleteMany(approvedList)
}