import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./main.css"
function StudentPageUI() {

    const [sessionID, setSessionID] = useState('');

    const changeSessionID = (event) => {
        setSessionID(event.target.value);
    }

    return (
        <div>
            <title>GOOGLE SLIDES TITLE HERE</title>
            <div className={"headerContainer"}>
                <div className={"containerLeft"}>
                    <button id={"usernamestudent"}>{"Hello, Guest"}</button>
                    <div className={"logo"}>
                        <img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />
                        <h1>Linkage</h1>
                    </div>
                </div>
                <div className={"containerRight"}>
                    <div className={"searchbar"}>
                        <input id={"searchbar"} className={"input"} type={"text"} name={"searchbar"} placeholder={"Session ID"} value={sessionID} onChange={changeSessionID} />
                    </div>
                    <div className={"tab"}>
                        <button className={"tablinks"} value={"button1"}>{'Log Out'}</button>
                        <button className={"tablinks"} value={"button2"}>{'Join Session '}</button>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                {/*for player now*/}
                <div className={"containerLeft"}>
                    <iframe src="https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal" style={{ width: '100%', height: '500px' }} frameBorder="0" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

                </div>
                <div className={"containerRight"}>
                    <div id="noteArea" contentEditable placeholder="Enter notes here..."></div>
                </div>
                <button id="sendQuestion" className="noteButton" onClick="sendQuestion()" style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>{"Send Note"}</button>
            </div>
        </div>
    );
}

export default StudentPageUI;
