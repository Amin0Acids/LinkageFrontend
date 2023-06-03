function fetchUserSignup(email, password){
    fetch("http://10.0.0.74:8080/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": String(email), //receive from signup page
            "password": String(password) //receive from signup page
        })
    }).then(response => {
        return response.json()
    })
        .then(data => data.isSuccessful = true)
        .catch(error => console.log(error))
    console.log(JSON.stringify({
        email: String(email), //receive from signup page
        password: String(password), //receive from signup page
    }))
}

export default fetchUserSignup;
//
// let loginReady = false;
// function fetchUserLogin(email, password) {
//     return new Promise((resolve, reject) => {
//         let loginReady = false;
//         fetch("http://10.0.0.74:8080/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "email": String(email),
//                 "password": String(password),
//             })
//         })
//             .then(response => response.json())
//             .then(data => {
//                 const token = data.jwtToken;
//                 document.cookie = `token=${token}; path=/`;
//                 loginReady = true;
//                 let currentUser = new User(String(email), String(password), token)
//                 localStorage.setItem("user", JSON.stringify(currentUser));
//                 resolve(loginReady);
//             })
//             .catch(error => {
//                 loginReady = false;
//                 console.log(error)
//                 reject(error);
//             });
//     });
// }
//
// function fetchUserLogout(){
//     fetch("http://10.0.0.74:8080/user/logout", {
//         method: "GET",
//         headers: {
//             "authorization": `Bearer ${jwtToken}`
//         }
//     }).then(response => response.json())
//         .then(data => data.isSuccessful = true)
//         .catch(error => console.log(error))
// }
//
// function fetchChangePassword(){
//     fetch("http://10.0.0.74:8080/user/password", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "authorization": `Bearer ${jwtToken}`
//         },
//         body: JSON.stringify({
//             password: "" //ask leo
//         })
//     })
//         .then(response => response.json())
//         .then(data => data.isSuccessful = true)
//         .catch(error => console.log(error))
// }
//
// function fetchActivateAccount(){
//     fetch("http://10.0.0.74:8080/user/activate", {
//         method: "GET",
//         headers: {
//             "authorization": `Bearer ${jwtToken}`
//         }
//     }).then(response => response.json())
//         .then(data => data.isSuccessful = true)
//         .catch(error => console.log(error))
// }