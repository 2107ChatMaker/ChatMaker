
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import Popup from './popups';

function App() {
    //declaring variables that we will use to toggle the bool state values for each kind of pop-up
    const [tagPopupOpen, setTagPopupOpen] = useState(false);
    const [reviewPopupOpen, setReviewPopupOpen] = useState(false);
    const [submitPopupOpen, setSubmitPopupOpen] = useState(false);
    //creating a function where if it's called, it will either open or close the popup, we have three different popups, so we will use three functions
    const toggleTagPopup = () => {
        //whatever the value is currently set as, switch it to the opposite
        setTagPopupOpen(!tagPopupOpen);
    }
    const toggleReviewPopup = () => {
        setReviewPopupOpen(!reviewPopupOpen);
    }
    const toggleSubmitPopup = () => {
        setSubmitPopupOpen(!submitPopupOpen);
    }

    return <div>
        { /*filling in some fake data to display the page where the pop-ups will trigger*/ }
        <br /><br /><br /><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        { /*Button that triggers the 'tag' popup to be displayed*/ }
        <button className="popupButton" onClick={toggleTagPopup}>Tags popup</button>
        {/*If the tagPopupOpen is set to true, and there's valid content, display the content*/}
        {tagPopupOpen && <Popup
            content={<>
                {/*for this popup, we will use a form to query the database for that tag*/}
                <form>
                    <h2>Add tags</h2>
                    { /*gives us a textbox the user can search*/ }
                    <input type="text" placeholder="Search for a tag..." id="search" name="search"></input><button>Search</button>
                    <hr />
                    { /*this will show the added tags*/ }
                    <h2>Tags:</h2> 
                    <div className="innerBox"><br/></div> <br />
                    { /*for now, this button just closes the popup, but we will change it later*/ }
                    <span><button className="popupButton" onClick={toggleTagPopup}>Done</button></span>
                </form>
                
            </>}
            
            handleClose={toggleTagPopup}
        />}
        <br /><br /><br /><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        <button className="popupButton" onClick={toggleReviewPopup}>Review popup</button>
        {reviewPopupOpen && <Popup
            content={<>
                <form>
                    <h2>Why did you rate it this way?</h2>
                    <hr />
                    <input type="checkbox" id="tagsBad" name="tagsBad" value="tagsBad"></input>
                    <label for="tagsBad"> Tags Bad </label><br />
                    <input type="checkbox" id="poorResp" name="poorResp" value="poorResp"></input>
                    <label for="poorResp"> Poor Response </label><br />
                    <input type="checkbox" id="fitPrompt" name="fitPrompt" value="fitPrompt"></input>
                    <label for="fitPrompt"> Doesn't fit the prompt! </label><br />
                    <input type="checkbox" id="tagsBad2" name="tagsBad2" value="tagsBad2"></input>
                    <label for="tagsBad2"> Tags Bad </label><br /> <br />
                    <span><button className="popupButton" onClick={toggleReviewPopup}>Done</button></span>
                    { /*later on, we will send these answers to be recorded in the database*/ }
                </form>

            </>}
            handleClose={toggleTagPopup}
        />}
        <br /><br /><br /><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
        <button className="popupButton" onClick={toggleSubmitPopup}>Submit popup</button>
        {submitPopupOpen && <Popup
            content={<>
                { /*this popup will appear after a successful post is made*/ }
                <span><h2 className=""> Success! </h2></span>
                <hr />
                <span>Post added!</span> <br /> <br />
                <button className="popupButton" onClick={toggleSubmitPopup}>Done</button>

            </>}
            handleClose={toggleSubmitPopup}
        />}
    </div>
}

export default App;

/* References
 
 https://www.cluemediator.com/create-simple-popup-in-reactjs
 
 */