// Represents all responses queried for a given question
export class ResponseSearchResult {
    // the question the user was asked
    question: String;
    // The user responses retreived
    responses: [Response];
    
    constructor(question: String, responses: [Response]) {
        this.question = question;
        this.responses = responses
    }
}