import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./login.css"
function LoginUI() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);

    }

    let registerMode = false;
    const switchMode = (event) => {
        //onclick
        if(!registerMode) {
            const confirmPassword = document.createElement("input");
            confirmPassword.setAttribute("type", "password");
            confirmPassword.setAttribute("name", "confirmPassword");
            confirmPassword.setAttribute("id", "confirmPassword");
            confirmPassword.setAttribute("placeholder", "Confirm Password")
            confirmPassword.setAttribute("class", "input");
            document.getElementById("container").insertBefore(confirmPassword, document.getElementById("errorOutput"));
            document.getElementById("login").innerHTML = "Register";
            document.getElementById("register").innerHTML = "Already have an account? ";
            const boldLogIn = document.createElement("b")
            boldLogIn.innerHTML = "Login";
            document.getElementById("register").appendChild(boldLogIn);

            registerMode = true;
        } else {
            document.getElementById("login").innerHTML = "Login";
            document.getElementById("register").innerHTML = "Register";
            document.getElementById("confirmPassword").remove();
            registerMode = false;
        }
    }

    const validateLoginForm = (event) =>{
        let confirmPassword = document.getElementById("confirmPassword");

        event.preventDefault()

        //check if email is email format (regex)
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(registerMode && !email.value.match(mailFormat)){
            setErrorMessage("Invalid e-mail format");

            return;
        }

        if(registerMode && password.value.length < 8 && registerMode){
            setErrorMessage("Password must be at least 8 characters");

            return;
        }

        if(registerMode && password.value !== confirmPassword.value){
            setErrorMessage("Passwords do not match");

            return;
        }
        if(registerMode) {
            setErrorMessage('');
            fetchUserSignup(username, password);
        } else {
            setErrorMessage('');

            fetchUserLogin(username, password)
        }
    }

    function fetchUserSignup(email, password) {

    }

    function fetchUserLogin(email, password) {

    }

    return (
        <div id="container">
            <div id="logo">
                <h1 style={{fontFamily: "Qanelas Soft SemiBold", fontSize: "400%"}}>jun 3</h1>
            </div>
            <input id="email" className="input" type="text" name="email" placeholder="E-mail" value={username} onChange={changeUsername}></input>
            <input id="password" className="input" type="password" name="password" placeholder="Password" value={password} onChange={changePassword}></input>
            <p id="errorOutput"></p>
            <button id="login" className="button" onClick={validateLoginForm}>Login</button>
            <button id="register" className="button" onClick={switchMode}>Register</button>
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
