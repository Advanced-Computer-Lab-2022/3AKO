import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const ExamForm = ({ exercise, subtitleId, courseId }) => {
    const [flag, setFlag] = useState(false);
    const [sol, setSol] = useState([]);
    const [grade, setGrade] = useState(0);
    const [mySol, setMySol] = useState(null);
    const [trueAnswers, setTrueAnswers] = useState([])
    const maxGrade = exercise.questions.length;
    useEffect(() => {
        axios({
            method: "post", url: `http://localhost:5000/trainee/getMyAnswers`,withCredentials:true,
            data: {
                courseId: courseId,
                exerciseId: exercise._id
            }
        }).then((response) => {

            if (response.data) {
                axios({
                    method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`,withCredentials:true,
                    data: {
                        courseId: courseId
                        , subtitleId: subtitleId
                        , exerciseId: exercise._id
                    }
                }).then((response) => {
                    setTrueAnswers(response.data.answers)
                })
                setMySol(response.data.answers)
                setGrade(response.data.grade)
            }
        })
    }, [])
    const submitExam = (event) => {
        console.log(sol);
        var myGrade = 0;
        event.preventDefault();
        const loadExamAnswers = async () => {
            await axios({
                method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`,withCredentials:true,
                data: {
                    courseId: courseId
                    , subtitleId: subtitleId
                    , exerciseId: exercise._id
                }
            }).then(async (response) => {
                // setAnswers(response.data.answers)
                for (let i = 0; i < exercise.questions.length; i++) {
                    if (sol[i] == response.data.answers[i]) {
                        myGrade++


                    }
                }

                await axios({
                    // hardcoded
                    method: "patch", url: `http://localhost:5000/trainee/addExerciseRecord`,withCredentials:true,
                    data: {
                        courseId: courseId,
                        subtitleId : subtitleId
                        , exerciseId: exercise._id
                        , grade: myGrade
                        , answers: sol
                    }
                })
                console.log(myGrade + "/", maxGrade)
            })
        }
        loadExamAnswers();

    }
    const change = (value, position) => {

        let arr = [...sol]
        arr[position] = value;
        setSol(arr);
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
        <div>
            {mySol && <div>

                {exercise.questions && exercise.questions.map((question, index) => (
                    <div>
                        <h3>{question.question}</h3>
                        <ul>
                            <li>{question.choice1}</li>
                            <li>{question.choice2}</li>
                            <li>{question.choice3}</li>
                            <li>{question.choice4}</li>
                        </ul>
                        <h4>True Answer is {trueAnswers[index]} and you chose {mySol[index]}</h4>
                    </div>
                ))}

                <h2>You got {grade} out of {maxGrade}</h2>
            </div>}
            {!mySol &&
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

                </form>}
        </div>);
}

export default ExamForm;