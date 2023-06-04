import React, {useEffect, useRef, useState} from "react";
import "./main.css"
import styles from "./teacherpage.module.css"
import QuestionList from "./questionList";
import ManageStudents from "./manageStudents";

function TeacherPageUI(props) {
    const [sessionID, setSessionID] = useState('');
    const [slideLink, setSlideLink] = useState('');
    // const doRender = useRef(false);
    const [doRender, setDoRender] = useState(false);
    const [username, setUsername] = useState('');
    const [questionIDs, setQuestionIDs] = useState([]);
    const [owner, setOwner] = useState("");

    const jwtTokenRef = useRef(props.jwtToken);

    useEffect(() => {
        jwtTokenRef.current = props.jwtToken;
    }, [props.jwtToken]);

    useEffect(() => {
        setOwner(props.owner);
    }, [props.owner]);

    function logout() {
        props.page("home");
    }

    function fetchCreateSession() {
        console.log(jwtTokenRef.current);
        fetch("http://10.0.0.74:8080/teacher/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                slideLink: String(slideLink),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
                setSessionID(data.id);
                console.log(data.id);
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
                sessionID: String(sessionID)
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

    function changeSlideLink(event) {
        setSlideLink(event.target.value);
    }

    function deleteSession() {
        removeSession();
        setSlideLink('');
        setSessionID('');
    }

    function manageStudents() {
        setDoRender(true);
    }

    let getDoRender = () => {
        setDoRender(false);
    };

    let getUsername = (username) => {
        setUsername(username);
    }

    return <div>
        <title>GOOGLE SLIDES TITLE HERE</title>
        <div className="headerContainer">
            <div className="containerLeft">
                <div className="logo">
                    {/*<img src={""} style={{width: "13%", height: "auto"}} alt={'error loading pic'} />*/}
                    <h1>Linkage</h1>
                </div>
                <div id={styles.session}>Session ID: {sessionID}</div>
                <p id="usernamestudent">Hello, {owner}</p>
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
                <iframe src={slideLink} style={{ width: '100%', height: '500px' }} allowFullScreen="true" ></iframe>
                {/*"https://docs.google.com/presentation/d/1SWiU05Wi6WsFG5IvUu5j-OeD6fGsZxBOkLQpxhXfGow/embed?rm=minimal"*/}
            </div>
            <div className="containerRight">
                <div id="noteArea" style={{borderWidth: "1.5px", padding: "8px"}}>
                    Questions: <br />
                    <QuestionList session={sessionID} jwtToken={jwtTokenRef.current}/>

                </div>
            </div>
            <div>
                <button id="students" className="noteButton" onClick={manageStudents} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Manage Students</button>
                <button id="deletesession" className="noteButton" onClick={deleteSession} style={{color: "white", fontFamily: 'Qanelas Soft SemiBold'}}>Remove Session</button>
            </div>

        </div>
        <ManageStudents doRender = {doRender} sessionID={sessionID} jwtToken={jwtTokenRef.current} sendDoRender={getDoRender} sendUsername={getUsername}/>
    </div>;
}

export default TeacherPageUI;