import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../stylesheets/test.css"
const ExamForm = ({ exercise, subtitleId, courseId }) => {
    const [flag, setFlag] = useState(false);
    const [sol, setSol] = useState([]);
    const [grade, setGrade] = useState(0);
    const [mySol, setMySol] = useState(null);
    const [trueAnswers, setTrueAnswers] = useState([])
    const maxGrade = exercise.questions.length;
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
                    // hardcoded
                    method: "patch", url: `http://localhost:5000/trainee/addExerciseRecord`, withCredentials: true,
                    data: {
                        courseId: courseId
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
    const change = (value, position, label) => {
        const x = document.getElementsByClassName("circle " + position)

        for (let i = 0; i < x.length; i++) {
            x[i].style = "border: 2px solid #ddd;"



        }
        // target.nextSibling.style = "border-color : red"
        label.style = "border-color: #8e498e"
        label.firstChild.firstChild.style = "border: 6px solid #8e498e; background-color: #fff"
        // console.log(label.firstChild.firstChild.style)
        console.log(value);
        console.log(label.firstChild.firstChild);

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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
                {mySol && <div>

                    {exercise.questions && exercise.questions.map((question, index) => (
                        <div className="pb-5">
                            <p className="fw-bold">{index + 1}. {question.question}</p>
                            <label className="box answer">
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> {question.choice1}</span>
                                </div>
                            </label>

                            <label className="box answer">
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> {question.choice3}</span>
                                </div>
                            </label>
                            <label className="box answer">
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> {question.choice3}</span>
                                </div>
                            </label>

                            <label className="box answer">
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> {question.choice4}</span>
                                </div>
                            </label>
                        </div>
                    ))}

                    <h2>You got {grade} out of {maxGrade}</h2>
                </div>}
                {!mySol &&
                    <form action="" className="py-3" onSubmit={submitExam}>
                        {
                            exercise.questions && exercise.questions.map((question, index) => (
                                <div className="pb-5">
                                    <p className="fw-bold">{index + 1}. {question.question}</p>
                                    <input type="radio" name={index} id={index + "1"} value="1" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} ></input>
                                    <label for={index + "1"} className="box ">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice1}</span>
                                        </div>
                                    </label>

                                    <input type="radio" name={index} id={index + "2"} value="2" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "2"} className="box ">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice3}</span>
                                        </div>
                                    </label>
                                    <input type="radio" name={index} id={index + "3"} value="3" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "3"} className="box ">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice3}</span>
                                        </div>
                                    </label>

                                    <input type="radio" name={index} id={index + "4"} value="4" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                                    <label for={index + "4"} className="box ">
                                        <div className="course">
                                            <span className={"circle " + index}></span>
                                            <span className="subject"> {question.choice4}</span>
                                        </div>
                                    </label>
                                </div>






                                // <div className="container mb-5">
                                //     <div className="row">
                                //         <div className="col-12">
                                //             <p className="fw-bold">{index + 1}. {question.question}</p>
                                //             <div>
                                //                 <input type="radio" name={question._id} id="one" />
                                //                 <input type="radio" name={question._id} id="two" />
                                //                 <input type="radio" name={question._id} id="three" />
                                //                 <input type="radio" name={question._id} id="four" />
                                //                 <label for="one" className="box first">
                                //                     <div className="course">
                                //                         <span className="circle"></span>
                                //                         <span className="subject"> {question.choice1}</span>
                                //                     </div>
                                //                 </label>
                                //                 <label for="two" className="box second">
                                //                     <div className="course"> <span className="circle">
                                //                     </span>
                                //                         <span className="subject">{question.choice2} </span>
                                //                     </div>
                                //                 </label>
                                //                 <label for="three" className="box third">
                                //                     <div className="course">
                                //                         <span className="circle"></span>
                                //                         <span className="subject"> {question.choice3}</span>
                                //                     </div>
                                //                 </label>
                                //                 <label for="four" className="box forth">
                                //                     <div className="course">
                                //                         <span className="circle"></span>
                                //                         <span className="subject"> {question.choice4} </span>
                                //                     </div>
                                //                 </label>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>








                            ))
                        }

                        {/* <div class="container mb-5">
                            <div class="row">
                                <div class="col-12">
                                    <p class="fw-bold">1. Which of the following sentences is correct</p>
                                    <div>
                                        <input type="radio" name="box" id="one" />
                                        <input type="radio" name="box" id="two" />
                                        <input type="radio" name="box" id="three" />
                                        <input type="radio" name="box" id="four" />
                                        <label for="one" class="box first"> <div class="course">
                                            <span class="circle"></span>
                                            <span class="subject"> When its raining ,people's umbrella are all you're going to see from above </span>
                                        </div>
                                        </label>
                                        <label for="two" class="box second">
                                            <div class="course"> <span class="circle">
                                            </span>
                                                <span class="subject"> When its raining,people's umbrella are all your going to see from above </span>
                                            </div>
                                        </label>
                                        <label for="three" class="box third">
                                            <div class="course">
                                                <span class="circle"></span>
                                                <span class="subject"> When its raining,peoples umbrella's are all you're going to see from above </span>
                                            </div>
                                        </label>
                                        <label for="four" class="box forth">
                                            <div class="course">
                                                <span class="circle"></span>
                                                <span class="subject"> None of the above </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <input id="submit" type="submit" disabled={!flag} />

                    </form>}
            </div>
        </div>);
}

export default ExamForm;