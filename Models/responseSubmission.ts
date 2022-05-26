import { Tag } from "./Enums/tag";

// Stores users feedback on a given user response
export class responseSubmission {
    // the email address of the user giving feedback
    email: String;
    // The tags the users has chosen for their response
    tags: [Tag]
    // the question the user is being asked
    question: String;
    // The response the user has given
    response: String;
    
    constructor(question: String, email: String, tags: [Tag], response: String) {
        this.email = email;
        this.tags = tags;
        this.question = question;
        if (response.length < 150 && response.length >= 2) {
            this.response = response;
        }
        else {
            throw new Error("Response Either too short or too long")
        }
        
    }
}