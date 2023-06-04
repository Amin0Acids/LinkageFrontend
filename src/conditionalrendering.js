import React, {useEffect, useState} from "react";
import LoginUI from "./login.js"
import StudentPageUI from "./studentpage.js";
import TeacherPageUI from "./teacherpage.js";

function ConditionalRendering(props) {

    const [page, setpage] = useState("home");

    function getPage(page) {
        setpage(page);
    }

    console.log("page: " + page);
    if (page === "home") {
        return <LoginUI page={getPage} />;
    }
    if (page === "student") {
        return <StudentPageUI page={getPage} />;
    }
    if (page === "teacher") {
        return <TeacherPageUI page={getPage} />;
    }
    return null;
}

export default ConditionalRendering;
