import React, {useState} from 'react';
import ReactDOM from 'react-dom/client'
import "./main.css"

const questionIDs = [];
function StudentPageUI() {
    const [sessionID, setSessionID] = useState('');
    const [slideLink, setSlideLink] = useState('https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal');
    const [slideNum, setSlideNum] = useState('');
    const [question, setQuestion] = useState('');

    function testValues() {
        console.log(sessionID);
        console.log(slideLink);
        console.log(slideNum);
        console.log(question);
    }

    const changeQuestion = (event) => {
        setQuestion(event.target.value);
    }
    const changeSlideNum = (event) => {
        setSlideNum(event.target.value);
    }
    const changeSlideLink = (event) => {
        setSlideLink(event.target.value);
    }
    const changeSessionID = (event) => {
        setSessionID(event.target.value);
    }
    function fetchLogout() {
        fetch("http://", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                //send them back to login page

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
            .catch((error) => console.log(error));
    }
    function fetchSessionID(sessionID) {
        //use when submitting sessionID
        fetch("http://10.0.0.74:8080/student/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionID: String(sessionID),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                changeSlideLink(data.slide);
            })
            .catch((error) => console.log(error));
        }

    function fetchQuestionInfo(slideNum, question) {
        //use when sending question
        fetch("http://10.0.0.74:8080/student/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slideNum: String(slideNum),
                question: String(question),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const item = {id: data.id, slideNum: data.slideNum, question: data.question};
                questionIDs.push(item);
            })
            .catch((error) => console.log(error));

        console.log(
            JSON.stringify({
                slideNum: String(slideNum),
                question: String(question),
            })
        );
    }

    function sendSessionID() {
        fetchSessionID(sessionID);
    }

    function sendQuestion() {
        fetchQuestionInfo(slideNum, question);
    }


    return (
        <div>
            <title>GOOGLE SLIDES TITLE HERE</title>
            <div className={"headerContainer"}>
                <div className={"containerLeft"}>
                    <p id={"usernamestudent"}>{"Hello, Guest"}</p>
                    <div className={"logo"}>
                        {/*<img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />*/}
                        <h1>Linkage</h1>
                    </div>
                </div>
                <div className={"containerRight"}>
                    <div className={"searchbar"}>
                        <input id={"searchbar"} className={"input"} type={"text"} name={"searchbar"} placeholder={"Session ID"} value={sessionID} onChange={changeSessionID} />
                    </div>
                    <div className={"tab"}>
                        <button className={"tablinks"} value={"button1"}>{'Log Out'}</button>
                        <button className={"tablinks"} value={"button2"} onClick={sendSessionID}>{'Join Session'}</button>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                {/*for player now*/}
                <div className={"containerLeft"}>
                    <iframe src={slideLink} style={{ width: '100%', height: '500px' }} frameBorder="0" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

                </div>
                <div className={"containerRight"}>
                    <textarea id="noteArea" contentEditable placeholder="Enter notes here..." value={question} onChange={changeQuestion} />
                </div>
                <input id={"slideNumText"} type={"text"} name={"slideNum"} placeholder={"Slide Number"} value={slideNum} onChange={changeSlideNum}/>
                <button id="sendQuestion" className="noteButton" onClick={sendQuestion} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>{"Send Question"}</button>
                <button onClick={testValues}>{'Test Values'}</button>
            </div>
        </div>
    );
}

export default StudentPageUI;
