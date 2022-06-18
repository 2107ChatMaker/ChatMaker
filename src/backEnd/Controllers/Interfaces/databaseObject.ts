import { HashMap } from "./hashMap";

// Required for any object that may interact with the database
export interface databaseObject {

    // Reference: Yudhvirs 2107 class exercise
    // convert the object properties you include to a hashmap
    toHashMap(): HashMap;
}