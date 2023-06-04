import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./login.css"
// import Conditionalrendering from "./conditionalrendering";
import LoginUI from "./login";
import ConditionalRendering from "./conditionalrendering";
import StudentPageUI from "./studentpage";
import TeacherPageUI from "./teacherpage";
import Conditionalrendering from "./conditionalrendering";

// const jwtToken = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("jwt="))
//     .split("=")[1];

// console.log(<ConditionalRendering props={'home'}/>)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Conditionalrendering page={'home'} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
