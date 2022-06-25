import { ObjectManager } from "./objectManager/objectManager";
import { Feedback } from "@constants/interfaces/Feedback";
import { DatabaseObject } from "../../../constants/interfaces/DatabaseObject";
import { HashMap } from "../../../constants/interfaces/HashMap";

/// used to give user feedback on a response
export class FeedbackController implements DatabaseObject, Feedback {
    // The _id of the response being rated
    responseID: string;
    // the rating the user gives the response (true == +1, false == -1)
    rating: Boolean;
    
    constructor(responseID: string, rating: Boolean) {
        this.responseID = responseID;
        this.rating = rating;
    }

    /// updates the responses rating based on the rating given
    giveFeedback() { 
        ObjectManager.updateRatingByID(this.responseID, this.rating);
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            responseID: this.responseID,
            rating: this.rating
        };
    }
}