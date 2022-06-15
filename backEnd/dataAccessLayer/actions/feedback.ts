import connectDatabase from "../../Database/database";
import Feedback from "@/Controllers/Schemas/feedback";

//for when user wants to delete feedback theyve given to a response 
export async function deleteFeedback(id: string) {  
    await connectDatabase();
    //will get the feedback id from the object that will be deleted
    //*need function to get the id from the object so it can read what needs to get deleted*
    //finds that feedback ion the database 
    const feedbackToDelete = await Feedback.find({id: id})
    //removes the user from the database so their account will be deleted.
    await Feedback.deleteOne(feedbackToDelete);
}

export async function addFeedback(id: String, responseID: Number, rating: 50){
    await connectDatabase();
    const feedback = new Feedback({
        id,
        responseID,
        rating
    });
    return feedback.save();
}

