import "./manageStudents.css";
import {useEffect, useRef, useState} from "react";

function ManageStudents(props) {

    const [doRender, setDoRender] = useState(false);

    useEffect(() => {
        setDoRender(props.doRender);
        console.log("doRender: " + doRender);
    }, [props.doRender]);

    function sendDoRender() {
        setDoRender(false);
        props.sendDoRender(false);
    }

    if (doRender) {
        return <div id="manage">
            <input id="student" placeholder="Student Username" />
            <button id="close" className="noteButton" style={{fontSize: "70%", float: "right"}} onClick={sendDoRender}>Close</button>
            <br/>
            <button id="addStudent" className="noteButton">Add Student</button>
            <button id="deleteStudent" className="noteButton">Delete Student</button>
        </div>
    } else {
        return null;
    }
}

export default ManageStudents;