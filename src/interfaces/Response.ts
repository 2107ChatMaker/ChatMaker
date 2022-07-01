import { Tag } from "@/utility/Enums/tag";

// represents a chat maker response to be saved to the database
export interface CMResponse {
    // the userID of the user giving feedback
    readonly userID: string;
    // the promptID of the question the user is being asked
    readonly promptID: string;
    // The response the user has given
    readonly response: string;
		// The tags the users has chosen for their response
    readonly tags: Tag[];
}