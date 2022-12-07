import { useState } from "react";
import axios from "axios";
const ExamForm = ({ exercise, subtitleId, courseId }) => {
    const [flag, setFlag] = useState(false);
    const mySolutions = []
    const [sol, setSol] = useState([]);
    const maxGrade = exercise.questions.length;
    const el = document.getElementById('submit');
    // 

    let x = 0;
    const submitExam = (event) => {
        console.log(sol);
        var myGrade = 0;
        event.preventDefault();
        const loadExamAnswers = async () => {
            await axios({
                method: "post", url: `http://localhost:5000/trainee/loadExamAnswers/${"1"}`,
                data: {
                    courseId: courseId
                    , subtitleId: subtitleId
                    , exerciseId: exercise._id
                }
            }).then(async (response) => {
                // setAnswers(response.data.answers)
                for (let i = 0; i < exercise.questions.length; i++) {
                    if (mySolutions[i] == response.data.answers[i]) {
                        myGrade++


                    }
                }

                await axios({
                    // hardcoded
                    method: "patch", url: `http://localhost:5000/trainee/addExerciseRecord/${"638058b17199c95dfc5dc6d4"}`,
                    data: {
                        courseId: courseId
                        , exerciseId: exercise._id
                        , grade: myGrade
                        , answers: mySolutions
                    }
                })
                console.log(myGrade + "/", maxGrade)


            })
        }
        loadExamAnswers();

    }

    const change = (value, position) => {
        mySolutions[position] = value;
        let arr = [...sol]
        arr[position] = value;
        setSol(arr);
        console.log([...mySolutions])
        var flag1 = true;
        if (arr.length !== maxGrade) {
            flag1 = false;
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == null) {
                    flag1 = false;
                }
            }
        }
        if (flag1) {
            setFlag(flag1)
        }
    }

    return (
        <form action="" onSubmit={submitExam}>
            <p>{exercise.title}</p>
            {
                exercise.questions && exercise.questions.map((question, index) => (<div>

                    <p >{question.question}</p>
                    <input type="radio" name={question._id} value="1" onChange={(e) => change(e.target.value, index)} />
                    <label >{question.choice1}</label>
                    <br />
                    <input type="radio" name={question._id} value="2" onChange={(e) => change(e.target.value, index)} />
                    <label >{question.choice2}</label>
                    <br />
                    <input type="radio" name={question._id} value="3" onChange={(e) => change(e.target.value, index)} />
                    <label>{question.choice3}</label>
                    <br />
                    <input type="radio" name={question._id} value="4" onChange={(e) => change(e.target.value, index)} />
                    <label>{question.choice4}</label>
                </div>

                ))
            }
            <input id="submit" type="submit" disabled={!flag} />

        </form>);
}

export default ExamForm;