import "./manageStudents.css";
import {useEffect, useRef, useState} from "react";

function ManageStudents(props) {

    const [doRender, setDoRender] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setDoRender(props.doRender);
        console.log("doRender: " + doRender);
    }, [props.doRender]);

    function fetchAddStudent() {
        fetch("http://10.0.0.74:8080/teacher/session/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${props.jwtToken}`
            },
            body: JSON.stringify({
                    //transfer this over child to parent
                    participantUsername: String(username),
                    sessionID: String(props.sessionID),
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
                Authorization: `Bearer ${props.jwtToken}`
            },
            body: JSON.stringify({
                //transfer this over child to parent
                participantUsername: String(username),
                sessionID: String(props.sessionID)
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
    }

    function sendDoRender() {
        setDoRender(false);
        props.sendDoRender(false);
    }

    let getUsername = (event) => {
        setUsername(event.target.value);
        props.sendUsername(event.target.value);
    }

    if (doRender) {
        return <div id="manage">
            <input id="student" placeholder="Student Username" value={username} onChange={getUsername}/>
            <button id="close" className="noteButton" style={{fontSize: "70%", float: "right"}} onClick={sendDoRender}>Close</button>
            <br/>
            <button id="addStudent" className="noteButton" onClick={fetchAddStudent}>Add Student</button>
            <button id="deleteStudent" className="noteButton" onClick={fetchRemoveStudent}>Delete Student</button>
        </div>
    } else {
        return null;
    }
}

export default ManageStudents;