import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./login.css"
import StudentPageUI from "./studentpage";
import Teacherpage from "./teacherpage";
import TeacherPageUI from "./teacherpage";
import LoginUI from "./login";

// const jwtToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("jwt="))
//     .split("=")[1];

function Conditionalrendering(props) {
        const page = useRef(props.page);
        if(page.current === 'home'){
                return <LoginUI />;
        }
        if(page.current === 'student'){
                return <StudentPageUI />;
        }
        if(page.current === 'teacher'){
                return <TeacherPageUI />;
        }
}
export default Conditionalrendering;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Conditionalrendering page={'student'}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
