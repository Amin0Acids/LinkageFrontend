import {useEffect, useRef, useState} from "react";
import "./main.css"
import styles from "./teacherpage.module.css"

function QuestionList(props) {

    const [questions, setQuestions] = useState([]);
    const jwtTokenRef = useRef(props.jwtToken);

    useEffect(() => {
        jwtTokenRef.current = props.jwtToken;
    }, [props.jwtToken]);

    useEffect(() => {
        setTimeout(() => {
            getQuestionInfo();
        }, 60000);
    });

    useEffect(() => {
        getQuestionInfo();
    }, [props.session]);

    let fetchRemoveQuestion = (event) => {
        fetch("http://10.0.0.74:8080/teacher/session/question/remove", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtTokenRef.current}`
            },
            body: JSON.stringify({
                //transfer this over child to parent
                questionID: String(event.target.id),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                data.isSuccessful = true;
            })
        getQuestionInfo();
    }

    function getQuestionInfo() {
        if (props.session !== ''){
            fetch("http://10.0.0.74:8080/teacher/session/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtTokenRef.current}`
                }, body: JSON.stringify({
                    sessionID: String(props.session)
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    let temp = [];
                    data.map((data) => {
                        const item = {id: data.id, slideNum: data.slideNum, question: data.question};
                        temp.push(item);
                        console.log(temp)
                    });
                    setQuestions(temp);
                })
        }
    }


    return <div>
        {props.session !== '' ? questions.map((item) => {
            return <div key={item.id}>
                <p>Slide {item.slideNum}: {item.question}</p>
                <button id={item.id} className="noteButton" style={{fontSize: "15px"}} onClick={fetchRemoveQuestion}>delete</button>
            </div>
        }) : null}
    </div>;
}

export default QuestionList;