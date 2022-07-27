export interface User {

    // mongoose assigned ID
    _id: string,

    //user email
    email: string,

    //list of rated response ids
    responsesRated: [string?],

    //list of saved response ids
    responsesSaved: [string?]
}