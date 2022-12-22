import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../stylesheets/examform.css"
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
const ExamForm = ({ exercise, subtitleId, courseId }) => {
    const [flag, setFlag] = useState(false);
    const [sol, setSol] = useState([]);
    const [grade, setGrade] = useState(0);
    const [mySol, setMySol] = useState(null);
    const [trueAnswers, setTrueAnswers] = useState([])
    const maxGrade = exercise.questions.length;
    const submitExam = (event) => {
        console.log(sol);
        var myGrade = 0;
        event.preventDefault();
        const loadExamAnswers = async () => {
            await axios({
                method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`, withCredentials: true,


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
                    method: "patch", url: `http://localhost:5000/trainee/addExerciseRecord`, withCredentials: true,
                    data: {
                        courseId: courseId
                        , subtitleId: subtitleId
                        , exerciseId: exercise._id
                        , answers: sol
                    }
                })
                console.log(myGrade + "/", maxGrade)
            })
        }
        loadExamAnswers();
    }
    useEffect(() => {
        axios({
            method: "post", url: `http://localhost:5000/trainee/getMyAnswers`, withCredentials: true,
            data: {
                courseId: courseId,
                exerciseId: exercise._id
            }
        }).then((response) => {

            if (response.data) {
                axios({
                    method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`, withCredentials: true,
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

    const change = (value, position, label) => {
        const x = document.getElementsByClassName("circle " + position)

        for (let i = 0; i < x.length; i++) {
            x[i].style = "border: 2px solid #ddd;"



        }
        // target.nextSibling.style = "border-color : red"
        label.style = "border-color: #8e498e"
        label.firstChild.firstChild.style = "border: 6px solid #8e498e; background-color: #fff"
        // console.log(label.firstChild.firstChild.style)
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
        <div className="py-3" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                <h3 style={{ textTransform: "capitalize", marginBottom: "30px" }}>{exercise.title}</h3>
                {mySol && <div>

                    {exercise.questions && exercise.questions.map((question, index) => (
                        <div className="pb-5">
                            <p className="fw-bold">{index + 1}. {question.question}</p>


                            <label className={mySol[index] == 1 ? trueAnswers[index] == 1 ? "box answer true" : "box answer false" : "box answer "}>
                                <div className="course">
                                    <span className={trueAnswers[index] == 1 ? "true " + index : mySol[index] == 1 ? "false " + index : "circle " + index}>
                                        {trueAnswers[index] == 1 ? <CheckOutlinedIcon style={{ fontSize: "13px", color: "#3bce6c" }} /> : mySol[index] == 1 ? <ClearOutlinedIcon style={{ fontSize: "13px", color: "#cb2b2b" }} /> : <div></div>}
                                    </span>
                                    <span className="subject"> {question.choice1}</span>
                                </div>
                            </label>

                            <label className={mySol[index] == 2 ? trueAnswers[index] == 2 ? "box answer true" : "box answer false" : "box answer "}>
                                <div className="course">
                                    <span className={trueAnswers[index] == 2 ? "true " + index : mySol[index] == 2 ? "false " + index : "circle " + index}>
                                        {trueAnswers[index] == 2 ? <CheckOutlinedIcon style={{ fontSize: "13px", color: "#3bce6c" }} /> : mySol[index] == 2 ? <ClearOutlinedIcon style={{ fontSize: "13px", color: "#cb2b2b" }} /> : <div></div>}
                                    </span>
                                    <span className="subject"> {question.choice2}</span>
                                </div>
                            </label>

                            <label className={mySol[index] == 3 ? trueAnswers[index] == 3 ? "box answer true" : "box answer false" : "box answer "}>
                                <div className="course">
                                    <span className={trueAnswers[index] == 3 ? "true " + index : mySol[index] == 3 ? "false " + index : "circle " + index}>
                                        {trueAnswers[index] == 3 ? <CheckOutlinedIcon style={{ fontSize: "13px", color: "#3bce6c" }} /> : mySol[index] == 3 ? <ClearOutlinedIcon style={{ fontSize: "13px", color: "#cb2b2b" }} /> : <div></div>}
                                    </span>
                                    <span className="subject"> {question.choice3}</span>
                                </div>
                            </label>

                            <label className={mySol[index] == 4 ? trueAnswers[index] == 4 ? "box answer true" : "box answer false" : "box answer "}>
                                <div className="course">
                                    <span className={trueAnswers[index] == 4 ? "true " + index : mySol[index] == 4 ? "false " + index : "circle " + index}>
                                        {trueAnswers[index] == 4 ? <CheckOutlinedIcon style={{ fontSize: "13px", color: "#3bce6c" }} /> : mySol[index] == 4 ? <ClearOutlinedIcon style={{ fontSize: "13px", color: "#cb2b2b" }} /> : <div></div>}
                                    </span>
                                    <span className="subject"> {question.choice4}</span>
                                </div>
                            </label>
                        </div>
                    ))}

                    <h2>You got {grade} out of {maxGrade}</h2>
                </div>}
                {!mySol &&
                    <form action="" id="form1" onSubmit={submitExam}>
                        {
                            exercise.questions && exercise.questions.map((question, index) => (
                                <div className="pb-5">
                                    <p className="fw-bold">{index + 1}. {question.question}</p>
                                    <input type="radio" name={index} id={index + "1"} value="1" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} ></input>
                                    <label for={index + "1"} className="box question">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice1}</span>
                                        </div>
                                    </label>

                                    <input type="radio" name={index} id={index + "2"} value="2" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "2"} className="box question">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice3}</span>
                                        </div>
                                    </label>
                                    <input type="radio" name={index} id={index + "3"} value="3" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "3"} className="box question">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice3}</span>
                                        </div>
                                    </label>

                                    <input type="radio" name={index} id={index + "4"} value="4" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "4"} className="box question">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice4}</span>
                                        </div>
                                    </label>
                                </div>
                            ))
                        }


                        <input id="submit" type="submit" disabled={!flag} />

                    </form>}
            </div>
        </div>);
}

export default ExamForm;