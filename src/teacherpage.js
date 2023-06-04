import React, {useState} from "react";
import "./main.css"
import styles from "./teacherpage.module.css"
import QuestionList from "./questionList";

function TeacherPageUI() {

    const questionIDs = [];
    const [sessionID, setSessionID] = useState('');
    const [slideLink, setSlideLink] = useState('');

    const changeSessionID = (event) => {
        setSessionID(event.target.value);
    }

    function getQuestionInfo() {
        fetch("http://", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const item = {id: data.id, slideNum: data.slideNum, question: data.question};
                questionIDs.push(item);
            })
    }

    function changeSlideLink(event) {
        setSlideLink(event.target.value);
    }

    function deleteSession() {
        return undefined;
    }

    function manageStudents() {
        return undefined;
    }

    return <div>
        <title>GOOGLE SLIDES TITLE HERE</title>
        <div className={"headerContainer"}>
            <div className={"containerLeft"}>
                <div className={"logo"}>
                    {/*<img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />*/}
                    <h1>Linkage</h1>
                </div>
                <div id={styles.session}>Session ID: {sessionID}</div>
                <p id={"usernamestudent"}>{"Hello, Guest"}</p>
            </div>
            <div className={"containerRight"}>
                <div className={"searchbar"}>
                    <textarea id={styles.searchbar} className={"input"} type={"text"} name={"searchbar"} placeholder={"Slide URL"} value={slideLink} onChange={changeSlideLink} />
                </div>
                <div className={"tab"}>
                    <button className={"tablinks"} value={"button1"}>Log Out</button>
                    <button className={"tablinks"} value={"button2"}>Create Session</button>
                </div>
            </div>
        </div>
        <div className={"container"}>
            {/*for player now*/}
            <div className={"containerLeft"}>
                <iframe src="https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal" style={{ width: '100%', height: '500px' }} frameBorder="0" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                {/*"https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal"*/}
            </div>
            <div className={"containerRight"}>
                <div id="noteArea" style={{borderWidth: "1.5px", padding: "8px"}}>
                    Questions: <br />
                    <QuestionList />
                </div>
            </div>
            <div>
                <button id="students" className="noteButton" onClick={manageStudents()} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Manage Students</button>
                <button id="deletesession" className="noteButton" onClick={deleteSession()} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Remove Session</button>
            </div>
        </div>
    </div>;
}

export default TeacherPageUI;