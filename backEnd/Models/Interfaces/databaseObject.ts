import { HashMap } from "./hashMap";

// Required for any object that may interact with the database
export interface databaseObject {

    // Reference: Yudhvirs 2107 class exercise
    // convert the object properties you include to a hashmap
    toHashMap(): HashMap;

    // saves the object to the database
    save();

    // returns an array of every object of this type stored in the database
    findAll();

    // returns an object matching the search parameter given or the first object of that type if no argument is given
    find();

}