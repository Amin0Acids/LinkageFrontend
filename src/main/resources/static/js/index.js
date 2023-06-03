import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
function LoginUI() {
    return (
        <div id="container">
            <div id="logo">
                <h1 style={{fontFamily: "Qanelas Soft SemiBold", fontSize: "400%"}}>jun 3</h1>
            </div>
            <input id="email" className="input" type="text" name="email" placeholder="E-mail"></input>
            <p id="errorOutput"></p>
            <button id="login" className="button" onClick="validateLoginForm()">Login</button>
            <button id="register" className="button" onClick="switchMode()">Register</button>
            <input id="password" className="input" type="password" name="password" placeholder="Password"></input>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoginUI />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
