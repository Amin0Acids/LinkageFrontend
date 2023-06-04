import {useState} from "react";
import "./main.css"
import styles from "./teacherpage.module.css"
import {questionIDs} from "./teacherpage";

function QuestionList() {

    const [questions, setQuestions] = useState([
        {id: 1, slideNum: 1, question: "What is the answer to this question?"},
        {id: 2, slideNum: 2, question: "What is the answer to that question?"},
        {id: 3, slideNum: 3, question: "who is the answer to this question?"}
    ]);

    setQuestions(questionIDs);

    return <div>
        {questions.map((item) => {
            return <div>
                <p>Slide {item.slideNum}: {item.question}</p>
                <button id={styles.questionbutton} className="noteButton">delete</button>
            </div>
        })}
    </div>;
}

export default QuestionList;