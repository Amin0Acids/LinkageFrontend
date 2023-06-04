import React, {useEffect, useState} from "react";
import LoginUI from "./login.js"
import StudentPageUI from "./studentpage.js";
import TeacherPageUI from "./teacherpage.js";

function ConditionalRendering(props) {

    const [page, setpage] = useState("home");
    const [jwtToken, setJwtToken] = useState("");

    function getPage(page) {
        setpage(page);
    }

    function getJWTToken(jwtToken) {
        setJwtToken(jwtToken)
    }

    console.log("page: " + page);
    if (page === "home") {
        return <LoginUI page={getPage} jwtToken={getJWTToken} />;
    }
    if (page === "student") {
        return <StudentPageUI page={getPage} jwtToken={jwtToken}/>;
    }
    if (page === "teacher") {
        return <TeacherPageUI page={getPage} jwtToken={jwtToken}/>;
    }
    return null;
}

export default ConditionalRendering;
