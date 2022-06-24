import { DatabaseObject } from "./Interfaces/databaseObject";
import { HashMap } from "./Interfaces/hashMap";

// Stores user search string for finding questions and provides the ability to return a hashmap of the querys words
export class SearchForPrompts implements DatabaseObject {
    // user submitted word or sentence used to find a corrisponding question in the database
    question: String;

    constructor(question: String) {

        this.question = question;
    }

    /// search for questions related tot he given question string    
    search() { 
                //TODO must implement when abbes db code is merged
        if (this.question != "" && this.question != null) {
            /// search for questions that 
        }
    }

    // Reference: https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
    // Removes special characters from search string and separates them into separate words 
    separateQuestionIntoWords = (): string[] => this.question.replace(/[^a-zA-Z]/g, "").split(' ');

    /// converts users search query for questions into a hashmap containing an array of the words that made up that query
    toHashMap(): HashMap {
        return {
            question: this.separateQuestionIntoWords()
        };
    }
}