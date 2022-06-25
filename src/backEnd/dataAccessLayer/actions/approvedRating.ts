import Database from "../../database/database";
import ApprovedResponseModel from "../schemas/approvedResponse";
import ResponseModel from "../schemas/response";

//moves the approved item from database to approved database
export default async function approvedResponseRatings(){
    await Database.setupClient();
    //searches the database to find all the responses that have a rating above of 70
    const approved = await ResponseModel.find({rating: { $gte: 70 }});
    //stores all the found responses in the approved list array so it can be moved to the approved databse
    const approvedList = approved;
    await ApprovedResponseModel.insertMany(approvedList);
    //deletes those responses from the previous collection
    await  ResponseModel.deleteMany(approvedList);
}