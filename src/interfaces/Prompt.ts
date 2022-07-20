import { ObjectId } from "mongoose";

// represents a prompt which is used to give context to the responses
export interface Prompt {
    //generated ID of the prompt
    readonly _id?: string | ObjectId;
    // The user submitting the prompts ID
    userID: string;
    // The prompt the user selected
    prompt: string;
}