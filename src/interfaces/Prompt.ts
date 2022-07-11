// represents a prompt which is used to give context to the responses
export interface Prompt {
    // The user submitting the prompts ID
    userID: string;
    // The prompt the user selected
    prompt: string;
}