import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../stylesheets/examform.css"
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Alert, AlertTitle, Backdrop } from "@mui/material";
import { Button } from "@mui/material";
import { useUserContext } from "../hooks/useUserContext";
const ExamForm = ({ exercise, subtitleId, courseId }) => {
    const { user, loading } = useUserContext()
    const [flag, setFlag] = useState(false);
    const [sol, setSol] = useState([]);
    const [grade, setGrade] = useState(0);
    const [mySol, setMySol] = useState(null);
    const [trueAnswers, setTrueAnswers] = useState([])
    const [solved, setSolved] = useState(true)
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [failed, setFailed] = useState(true)
    const maxGrade = exercise.questions.length;
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }
    const submitExam = async (event) => {
        setFlag(false)
        // console.log(sol);
        // var myGrade = 0;
        event.preventDefault();
        axios({
            method: "patch", url: `http://localhost:5000/trainee/addExerciseRecord`, withCredentials: true,
            data: {
                courseId: courseId,
                subtitleId: subtitleId,
                exerciseId: exercise._id,
                answers: sol
            }
        }).then(async (response) => {
            setSolved(!solved)
            console.log(response.data);
            if (response.data.grade) {
                setGrade(response.data.grade)
                setFailed(false)
                setBackdropOpen(true)
                await timeout(2500);
                setBackdropOpen(false)
            }
            else {
                setBackdropOpen(true)
                await timeout(2500);
                setBackdropOpen(false)
            }
            setFlag(true)
        })

        //     await axios({
        //         method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`, withCredentials: true,


        //         data: {
        //             courseId: courseId
        //             , subtitleId: subtitleId
        //             , exerciseId: exercise._id
        //         }
        //     }).then(async (response) => {
        //         // setAnswers(response.data.answers)
        //         for (let i = 0; i < exercise.questions.length; i++) {
        //             if (sol[i] == response.data.answers[i]) {
        //                 myGrade++


        //             }
        //         }



        //     })
        // }
        // loadExamAnswers();
    }


    useEffect(() => {
        if (user && user.type == 'instructor') {
            axios({
                method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`,
                data: {
                    courseId: courseId
                    , subtitleId: subtitleId
                    , exerciseId: exercise._id
                }
            }).then((response2) => {
                setTrueAnswers(response2.data.answers)
                setMySol(response2.data.answers)
            })

        }
        else {






            axios({
                method: "post", url: `http://localhost:5000/trainee/getMyAnswers`, withCredentials: true,
                data: {
                    courseId: courseId,
                    exerciseId: exercise._id
                }
            }).then((response) => {
                if (response.data) {
                    axios({
                        method: "post", url: `http://localhost:5000/trainee/loadExamAnswers`,
                        data: {
                            courseId: courseId
                            , subtitleId: subtitleId
                            , exerciseId: exercise._id
                        }
                    }).then((response2) => {
                        setTrueAnswers(response2.data.answers)
                        setMySol(response.data.answers)
                        setGrade(response.data.grade)
                    })

                }
            })
        }
    }, [solved])

    const change = (value, position, label) => {
        const x = document.getElementsByClassName("circle " + position)

        for (let i = 0; i < x.length; i++) {
            x[i].style = "border: 2px solid #ddd;"
            x[i].parentElement.parentElement.style = "border-color: none"
        }
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdropOpen}
                    onClick={() => { setBackdropOpen(false) }}
                >
                    {failed ?
                        <Alert severity="error">
                            <AlertTitle>Failed</AlertTitle>
                            You failed this exercise — <strong>please try again!</strong>
                        </Alert>
                        :
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            YOU DID WELL! — <strong> You got {grade}/{maxGrade}</strong>
                        </Alert>
                    }
                </Backdrop>
                <h3 style={{ textTransform: "capitalize", marginBottom: "30px" }}>{exercise.title}{(mySol && user.type !== 'instructor') && <span style={{ marginLeft: "25px", border: "solid 1.5px green", padding: "7px", borderRadius: "5px" }}>Grade : {grade}/{maxGrade}</span>}</h3>
                {mySol &&
                    <div>

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
                    </div>}
                {!mySol &&
                    <form action="" id="form1" onSubmit={submitExam} >
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
                                            <span className="subject"> {question.choice2}</span>
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

                        <Button variant="contained" type="submit" id="submit" disabled={!flag} size="medium">
                            Submit
                        </Button>

                    </form>}
            </div>
        </div>);
}

export default ExamForm;