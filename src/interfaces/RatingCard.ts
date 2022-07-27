import { Tag } from "@/utility/Enums/tag";

// represents a the data on card that is generated on the rate page
export interface RatingCard {

    // the mongoose generated ID of the response
    readonly responseId: string;

    // the prompt that belongs to the current response
    readonly prompt: string;

    // The response the user is about to rate
    readonly response: string;
    
		// The tags that define the current response
    readonly tags: Tag[];
}