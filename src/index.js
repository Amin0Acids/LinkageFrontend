import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./login.css"
import fetchUserSignup from "./userfetches";

function LoginUI() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);

    }

    const changeRole = (event) => {
        setRole(event.target.value);
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

            fetchUserSignup(username, password, role);
        } else {
            setErrorMessage('');

            // fetchUserLogin(username, password)
        }
    }

    function logvalues(){
        console.log(username);
        console.log(password);
        console.log(role);
    }


    return (
        <div id="container">
            <div id="logo">
                <h1 style={{fontFamily: "Qanelas Soft SemiBold", fontSize: "400%"}}>jun 3</h1>
            </div>
            <input id={"username"} className="input" type="text" name="username" placeholder="Username" value={username} onChange={changeUsername}></input>
            <input id={"password"} className="input" type="password" name="password" placeholder="Password" value={password} onChange={changePassword}></input>
            <input id={"role"} className={"input"} list={"roles"} name="role" placeholder="Role" value={role} onChange={changeRole}/>
            <dataList id={"roles"}>
                <option value={"Teacher"}></option>
                <option value={"Student"}></option>
            </dataList>
            {/*check if is error message*/}
            {errorMessage && <p>{errorMessage}</p>}
            <button className={"button"} onClick={logvalues}>testing</button>
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
