import { Tag } from "./Enums/tag";

// Represents  a response in the database
export class Response {
    // the email address of the user giving feedback
    public readonly email: String;
    // The tags the users has chosen for their response
    public readonly tags: [Tag]
    // the question the user is being asked
    public readonly question: String;
    // The response the user has given
    public readonly response: String;
    
    constructor(question: String, email: String, tags: [Tag], response: String) {
        this.email = email;
        this.tags = tags;
        this.question = question;
        this.response = response;
    }
}