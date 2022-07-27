// used to represent user feedback on a particular response
export interface Feedback {

     // gets the responseid from the response the feedback is given to
     responseID: string;
     
     // the rating the user gives the response
     rating: Boolean;
}