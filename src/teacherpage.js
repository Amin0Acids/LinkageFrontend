import React, {useEffect, useRef, useState} from "react";
import "./main.css"
import styles from "./teacherpage.module.css"
import QuestionList from "./questionList";
import ManageStudents from "./manageStudents";

function TeacherPageUI(props) {

    let questionIDs = [];
    const [sessionID, setSessionID] = useState('');
    const [slideLink, setSlideLink] = useState('');
    // const doRender = useRef(false);
    const [doRender, setDoRender] = useState(false);

    const jwtTokenRef = useRef(props.jwtToken);

    useEffect(() => {
        jwtTokenRef.current = props.jwtToken;
    }, [props.jwtToken]);

    function logout() {
        props.page("home");
    }

    function fetchCreateSession() {
        fetch("http://10.0.0.74:8080/teacher/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                slideLink: String(slideLink),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }

    function removeSession() {
        fetch("http://10.0.0.74:8080/teacher/session", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                sessionID: String(sessionID),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }

    function fetchAddStudent() {
        fetch("http://10.0.0.74:8080/teacher/session/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                //transfer this over child to parent
                participantUsername: String(username),
                sessionID: String(sessionID),
            }
            ),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }

    function fetchRemoveStudent() {
        fetch("http://10.0.0.74:8080/teacher/session/remove", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                //transfer this over child to parent
                participantUsername: String(username),
                sessionID: String(sessionID)
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }

    function fetchRemoveQuestion() {
        fetch("http://10.0.0.74:8080/teacher/session/question/remove", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                //transfer this over child to parent
                questionID: String(questionID),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }
    const changeSessionID = (event) => {
        setSessionID(event.target.value);
    }

    function getQuestionInfo() {
        fetch("http://10.0.0.74:8080/teacher/session/question", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            }, body: JSON.stringify({
                sessionID: String(sessionID)
            })
        })
            .then((response) => response.json())
            .then((data) => {
                let temp = [];
                data.map((data) => {
                    const item = {id: data.id, slideNum: data.slideNum, question: data.question};
                    temp.push(item);
                });
                questionIDs = temp;
            })
    }

    function changeSlideLink(event) {
        setSlideLink(event.target.value);
    }

    function deleteSession() {

    }

    function manageStudents() {
        setDoRender(true);
    }

    let getDoRender = () => {
        setDoRender(false);
    };

    return <div>
        <title>GOOGLE SLIDES TITLE HERE</title>
        <div className="headerContainer">
            <div className="containerLeft">
                <div className="logo">
                    {/*<img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />*/}
                    <h1>Linkage</h1>
                </div>
                <div id={styles.session}>Session ID: {sessionID}</div>
                <p id="usernamestudent">Hello, Guest</p>
            </div>
            <div className="containerRight">
                <div className="searchbar">
                    <textarea id={styles.searchbar} className="input" type="text" name="searchbar" placeholder="Slide URL" value={slideLink} onChange={changeSlideLink} />
                </div>
                <div className="tab">
                    <button className="tablinks" value="button1" onClick={logout}>Log Out</button>
                    <button className="tablinks" value="button2" onClick={fetchCreateSession}>Create Session</button>
                </div>
            </div>
        </div>
        <div className="container">
            {/*for player now*/}
            <div className="containerLeft">
                <iframe src="https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal" style={{ width: '100%', height: '500px' }} allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                {/*"https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal"*/}
            </div>
            <div className="containerRight">
                <div id="noteArea" style={{borderWidth: "1.5px", padding: "8px"}}>
                    Questions: <br />
                    <QuestionList />
                </div>
            </div>
            <div>
                <button id="students" className="noteButton" onClick={manageStudents} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Manage Students</button>
                <button id="deletesession" className="noteButton" onClick={deleteSession} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Remove Session</button>
            </div>

        </div>
        <ManageStudents doRender = {doRender} sendDoRender={getDoRender}/>
    </div>;
}

export default TeacherPageUI;