import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./login.css"

const jwtToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    .split("=")[1];

function LoginUI() {
    const jwtTokenRef = useRef(null);


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

    function loginSuccess(token) {
        //whenever we need to access jwt token use kwtTokenRef
        jwtTokenRef.current = token;
    }
    function fetchUserSignup(email, password, role) {
        fetch("http://10.0.0.74:8080/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: String(email),
                password: String(password),
                role: String(role),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.isSuccessful);
            })
            .catch((error) => console.log(error));

        console.log(
            JSON.stringify({
                email: String(email),
                password: String(password),
                role: String(role),
            })
        );
    }

    function fetchUserLogin(email, password) {
        return new Promise((resolve, reject) => {
            fetch("http://10.0.0.74:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtTokenRef.current}`
                },
                body: JSON.stringify({
                    email: String(email),
                    password: String(password),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const token = data.jwtToken;
                    document.cookie = `token=${token}; path=/`;
                    loginSuccess(token)
                    resolve(true);
                })
                .catch((error) => {
                    
                    console.log(error);
                    reject(error);
                });
        });
    }

    function fetchUserLogout() {
        fetch("http://10.0.0.74:8080/user/logout", {
            method: "GET",
            headers: {
                authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
            .catch((error) => console.log(error));
    }

    function fetchChangePassword() {
        fetch("http://10.0.0.74:8080/user/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                password: "", // ask leo
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
            .catch((error) => console.log(error));
    }

    function fetchActivateAccount() {
        fetch("http://10.0.0.74:8080/user/activate", {
            method: "GET",
            headers: {
                authorization: `Bearer ${jwtToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
            .catch((error) => console.log(error));
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

            UserAPI.fetchUserSignup(username, password, role);
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

    //fetches


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
