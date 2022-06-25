import { Tag } from "@/Utility/Enums/tag";

// represents a chat maker response to be saved to the database
export interface CMResponse {
    // the userID of the user giving feedback
    readonly userID: String;
    // the promptID of the question the user is being asked
    readonly promptID: String;
    // The response the user has given
    readonly response: String;
		// The tags the users has chosen for their response
    readonly tags: Tag[]
}