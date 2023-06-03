import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
function LoadUI() {
    return (
        <body>
        <div id="container"> {/*This is the container for the logo and the form, and centers the elements*/}
            <div id="logo">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    <img src='' alt="no picture"
                         style="width: 125px; height: auto; margin-right: 20px;"></img>
                </a>

                <h1 style="font-family: 'Qanelas Soft SemiBold'; font-size:400%">jun 3</h1>
            </div>

            <!-- login form -->


            <input id="email" className="input" type="text" name="email" placeholder="E-mail">
                <input id="password" className="input" type="password" name="password" placeholder="Password">
                    <p id="errorOutput"></p>
                    <button id="login" className="button" onClick="validateLoginForm()">Login</button>
                    <button id="register" className="button" onClick="switchMode()">Register</button>
                </input>
            </input>
        </div>
        </body>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoadUI />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
