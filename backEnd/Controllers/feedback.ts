import { databaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Stores users feedback on a given user response
export class Feedback implements databaseObject {
    // the email address of the user giving feedback
    email: String;
    // the question that the feedback is for
    question: String;
    // the rating given by the user between 1-4
    rating: number;
    // if user rating <= 2 user promted for additional feedback
    // were the tags given in response incorrect 
    tagsIncorrect: boolean = false;
    // was the spelling of the response bad
    spellingBad: boolean = false;
    // was the response offensive
    offensive: boolean = false;
    // did the response make no sense given the question
    makesNoSense: boolean = false;
    
    constructor(question: String, email: String, rating: number, tagsIncorrect: boolean = false, 
                spellingBad: boolean = false, offensive: boolean = false, makesNoSense: boolean = false) {
        this.email = email;
        this.question = question;
        this.rating = rating;
        this.tagsIncorrect = tagsIncorrect;
        this.spellingBad = spellingBad;
        this.offensive = offensive;
        this.makesNoSense = makesNoSense;
    }

    /// converts given values into a HashMap
    toHashMap(): HashMap {
        return {
            email: this.email,
            question: this.question,
            rating: this.rating,
            tagsIncorrect: this.tagsIncorrect,
            spellingBad: this.spellingBad,
            offensive: this.offensive,
            makesNoSense: this.makesNoSense
        }
    }

}