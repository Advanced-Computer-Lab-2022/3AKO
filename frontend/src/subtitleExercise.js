import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import { Button, TextField } from "@mui/material";
const { useParams } = require("react-router-dom")



const SubtitleExercise = ({ courseId, subtitleId, stateChanger }) => {

    //load all previous questions (editable, deletable)
    // button to add new question to the exercise

    // const [exercise, setExercise] = useState(null);
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        let arr = [...questions]
        arr[0] = { question: "", choice1: "", choice2: '', choice3: '', choice4: '', answer: 0 }
        setQuestions(arr)
    }, []);

    const AddQuestion = () => {
        let arr = [...questions]
        arr.push({ question: "", choice1: "", choice2: '', choice3: '', choice4: '', answer: 0 })
        setQuestions(arr)
        console.log(arr);

    }
    const submitExam = (event) => {
        event.preventDefault();
        axios({
            method: 'patch', url: `http://localhost:5000/instructor/addExercise`, data: {
                courseId: courseId,
                title: "exerciseTitle",
                subtitleId: subtitleId,
                questions: questions
            }, withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                stateChanger(true)
            }).catch((error) => {
                console.log(error); //Logs a string: Error: Request failed with status code 404
            });

    }


    const change = (value, position, label) => {
        const x = document.getElementsByClassName("circle " + position)

        for (let i = 0; i < x.length; i++) {
            x[i].style = "border: 2px solid #ddd;"
        }
        label.firstChild.firstChild.style = "border: 6px solid #8e498e; background-color: #fff"
        let arr = [...questions]
        arr[position].answer = value;
        setQuestions(arr);
        console.log(arr);

    }
    const changeQuestion = (value, position) => {
        let arr = [...questions]
        arr[position].question = value;
        setQuestions(arr);
        console.log(arr);
    }
    const changeChoice = (value, position, choice) => {
        let arr = [...questions]
        switch (choice) {
            case 1:
                arr[position].choice1 = value;
                break;
            case 2:
                arr[position].choice2 = value;
                break;
            case 3:
                arr[position].choice3 = value;
                break;
            case 4:
                arr[position].choice4 = value;
                break;

            default:
                break;
        }

        setQuestions(arr);
        console.log(arr);
    }
    const [titleKey, setTitleKey] = useState(true)
    const [titleValue, setTitleValue] = useState('')
    const handleTitleBlur = () => {
        if (/\S/.test(titleValue))
            setTitleKey(false)
    }
    return (
        <div>
            {titleKey ?
                <TextField
                    value={titleValue}
                    style={{ textTransform: "capitalize", minWidth: "300px", marginRight: 'auto', marginBottom: '30px' }}
                    id="title" name='title' required label='Title'
                    onChange={(e) => { setTitleValue(e.target.value) }}
                    onBlur={handleTitleBlur} />
                : <h3 style={{ textTransform: "capitalize", width: "832px", marginBottom: '20px' }}>{titleValue} <button onClick={() => { setTitleKey(true) }} style={{ border: 'none', background: 'none' }}><i class="bi bi-pencil-square"></i></button></h3>
            }


            <form action="" id="form1" onSubmit={submitExam} >
                {
                    questions && questions.map((question, index) => (
                        <div className="pb-5">
                            <div style={{ display: 'flex', justifyContent: 'row', alignItems: 'baseline', columnGap: '23px' }}>
                                <p className="fw-bold">{index + 1}. </p>
                                <TextField required style={{ width: '870px' }} placeholder='Question...' value={question.question} onChange={(e) => changeQuestion(e.target.value, index)} />
                            </div>
                            <input type="radio" name={index} id={index + "1"} value="1" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} ></input>
                            <label for={index + "1"} className="box question" style={{ width: '800px', padding: '0', background: 'none', border: 'none' }}>
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> <TextField required placeholder="Possible choice 1" style={{ width: '730px' }} value={question.choice1} onChange={(e) => changeChoice(e.target.value, index, 1)} /></span>
                                </div>
                            </label>

                            <input required type="radio" name={index} id={index + "2"} value="2" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                            <label for={index + "2"} className="box question" style={{ width: '800px', padding: '0', background: 'none', border: 'none' }}>
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> <TextField required placeholder="Possible choice 2" style={{ width: '730px' }} value={question.choice2} onChange={(e) => changeChoice(e.target.value, index, 2)} /></span>
                                </div>
                            </label>
                            <input type="radio" name={index} id={index + "3"} value="3" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                            <label for={index + "3"} className="box question" style={{ width: '800px', padding: '0', background: 'none', border: 'none' }}>
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> <TextField required placeholder="Possible choice 3" style={{ width: '730px' }} value={question.choice3} onChange={(e) => changeChoice(e.target.value, index, 3)} /></span>
                                </div>
                            </label>

                            <input type="radio" name={index} id={index + "4"} value="4" onChange={(e) => change(e.target.value, index, e.target.nextElementSibling)} />
                            <label for={index + "4"} className="box question" style={{ width: '800px', padding: '0', background: 'none', border: 'none' }}>
                                <div className="course">
                                    <span className={"circle " + index}></span>
                                    <span className="subject"> <TextField required placeholder="Possible choice 4" style={{ width: '730px' }} value={question.choice4} onChange={(e) => changeChoice(e.target.value, index, 4)} /></span>
                                </div>
                            </label>
                        </div>
                    ))
                }
                <Button variant="contained" onClick={AddQuestion} size="medium">
                    AddQuestion
                </Button>
                <Button variant="contained" type="submit" id="submit" /*disabled={!flag}*/ size="medium">
                    Submit
                </Button>

            </form>
        </div>
    );
}

export default SubtitleExercise;