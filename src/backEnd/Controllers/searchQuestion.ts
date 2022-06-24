import { DatabaseObject } from "../Controllers/Interfaces/databaseObject";
import { HashMap } from "../Controllers/Interfaces/hashMap";

// Stores user search string for finding questions and provides the ability to return a hashmap of the querys words
export class SearchQuestion implements DatabaseObject {
    // user submitted word or sentence used to find a corrisponding question in the database
    question: String;

    constructor(question: String) {

        this.question = question;
    }

    /// converts users search query for questions into a hashmap containing an array of the words that made up that query
    toHashMap(): HashMap {

        // Reference: https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
        
        // Removes special characters from search string and separates them into separate words 
        let wordsInQuestion: String[] = this.question.replace(/[^a-zA-Z]/g, "") .split(' ');

        return {
            question: wordsInQuestion
        };
    }
}