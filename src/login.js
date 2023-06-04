import React, {useRef, useState} from "react";
import Conditionalrendering from "./conditionalrendering";

let registerMode = false;
function LoginUI(props) {
    const jwtTokenRef = useRef(null);
    const [registerModeVar, setRegisterMode] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleVal, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    }

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
    function fetchUserSignup(username, password, roleVal) {
        fetch("http://10.0.0.74:8080/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: String(username),
                password: String(password),
                role: String(roleVal),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
            .catch((error) => console.log(error));

        console.log(
            JSON.stringify({
                username: String(username),
                password: String(password),
                role: String(roleVal),
            })
        );
    }

    async function fetchUserLogin(username, password) {
        try {
            const response = await fetch("http://10.0.0.74:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: String(username),
                    password: String(password),
                }),
            })

            const data = await response.json();
            setRole(String(data.role));
            const token = data.jwtToken;
            document.cookie = `token=${token}; path=/`;
            loginSuccess(token)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    const switchMode = (event) => {
        //onclick
        if(!registerMode) {
            const confirmPassword = document.createElement("input");
            confirmPassword.setAttribute("type", "password");
            confirmPassword.setAttribute("name", "confirmPassword");
            confirmPassword.setAttribute("id", "confirmPassword");
            confirmPassword.setAttribute("placeholder", "Confirm Password");
            confirmPassword.setAttribute("class", "input");
            document.getElementById("container").insertBefore(confirmPassword, document.getElementById("errorOutput"));
            document.getElementById("login").innerHTML = "Register";
            document.getElementById("register").innerHTML = "Already have an account? ";
            const boldLogIn = document.createElement("b")
            boldLogIn.innerHTML = "Login";
            document.getElementById("register").appendChild(boldLogIn);

            registerMode = true;
            setRegisterMode(true);
        } else {
            document.getElementById("login").innerHTML = "Login";
            document.getElementById("register").innerHTML = "Register";
            document.getElementById("confirmPassword").remove();
            registerMode = false;
            setRegisterMode(false);
        }
    }

    const validateLoginForm = (event) =>{
        let confirmPassword = document.getElementById("confirmPassword");
        console.log(errorMessage)
        console.log(registerMode)
        if(registerMode && password.length < 8 && registerMode){
            setErrorMessage("Password must be at least 8 characters");
            console.log(errorMessage)

            return;
        }
        else if(registerMode && password !== confirmPassword.value){
            setErrorMessage("Passwords do not match");
            console.log(errorMessage)

            return;
        }
        else{
            if(registerMode) {
                setErrorMessage('');

                fetchUserSignup(username, password, roleVal);
            } else {
                console.log("logging in")
                setErrorMessage('');

                fetchUserLogin(username, password)
                    .then(() => {
                        console.log(jwtTokenRef.current);
                        console.log(roleVal);
                        if (roleVal === "Teacher"){
                            changePage('teacher');
                            props.page('teacher');
                        } else {
                            changePage('student');
                            props.page('student');
                        }
                    })
                    .catch(() => {console.log(jwtTokenRef.current); alert("Your email or password may be incorrect.")});
            }
        }

    }

    function logvalues(){
        console.log(username);
        console.log(password);
        console.log(roleVal);
        console.log(registerModeVar);
        // setCurrentPage('teacher');
        // props.page('teacher');
    }
//conditional rendering

    return (
        <div id="container">
            <div id="logo">
                <h1 style={{fontFamily: "Qanelas Soft SemiBold", fontSize: "400%"}}>Linkage</h1>
            </div>
            <input id={"username"} className="input" type="text" name="username" placeholder="Username" value={username} onChange={changeUsername}></input>
            <input id={"password"} className="input" type="password" name="password" placeholder="Password" value={password} onChange={changePassword}></input>
            {registerModeVar ? <> <input id={"role"} className={"input"} list={"roles"} name="role" placeholder="Role" value={roleVal} onChange={changeRole}/>
                <dataList id={"roles"}>
                    <option value={"Teacher"}></option>
                    <option value={"Student"}></option>
                </dataList> </> : null}
            {/*check if is error message*/}
            {errorMessage && <p>{errorMessage}</p>}
            {/*<button className={"button"} onClick={logvalues}>testing</button>*/}
            <button id="login" className="button" onClick={validateLoginForm}>Login</button>
            <button id="register" className="button" onClick={switchMode}>Register</button>
        </div>
    );
}

export default LoginUI;