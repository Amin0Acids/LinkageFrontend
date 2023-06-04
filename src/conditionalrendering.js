import React from "react";
import LoginUI from "./login.js"
import StudentPageUI from "./studentpage.js";
import TeacherPageUI from "./teacherpage.js";

function ConditionalRendering(props) {

    const page = props.page;
    console.log("page: " + page);
    if (page === "home") {
        return <LoginUI />;
    }
    if (page === "student") {
        return <StudentPageUI />;
    }
    if (page === "teacher") {
        return <TeacherPageUI />;
    }
    return null;
}

export default ConditionalRendering;
