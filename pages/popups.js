import React from "react";
 /*creating a definition of Popup so we can use it on the other page, we are creating it as a 'prop' or property so we can use it elsewhere in the app*/ 
const Popup = props => {
    /*when we create it, we get returned a container for the popupbox, and the content of whatever button we pressed*/
    return (
        <div className="popupBox">
            <div className="box">
                {props.content}
            </div>
        </div>
    );
};

export default Popup;