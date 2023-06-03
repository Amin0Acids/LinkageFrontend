import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./main.css"
function StudentPageUI() {

    return (
        <div>
            <title>GOOGLE SLIDES TITLE HERE</title>
            <div className={"headerContainer"}>
                <div className={"containerLeft"}>
                    <div className={"logo"}>
                        <img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />
                        <h1>Linkage</h1>
                    </div>
                </div>
                <div className={"containerRight"}>
                    <div className={"tab"}>
                        <button className={"tablinks"} value={"button1"}>{'Button1'}</button>
                        <button className={"tablinks"} value={"button2"}>{'Button2'}</button>
                    </div>
                    <button id={"username"}>{"Hello, Guest"}</button>
                </div>
            </div>
            <div className={"container"}>
                {/*for player now*/}
                <div className={"containerLeft"}>

                </div>
                <div className={"containerRight"}>
                    <div className={"btn-group"}>
                        
                    </div>
                </div>
                <div id="noteArea" contentEditable placeholder="Enter notes here..."></div>

                <button id="sendQuestion" className="questionButton" onClick="sendQuestion()" style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>{"Send Note"}</button>
            </div>
        </div>
    );
}

export default StudentPageUI;
