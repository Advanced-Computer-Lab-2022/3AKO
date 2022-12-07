import { useState } from "react";

const ExamForm = ({ exercise }) => {

    const mySolutions = ['2', '3']
    const maxGrade = exercise.questions.length;

    const submitExam = (event) => {
        var myGrade = 0;
        event.preventDefault();
        for (let i = 0; i < exercise.questions.length; i++) {
            if (mySolutions[i] == exercise.questions[i].answer) {
                myGrade++

            }
        }
        console.log(myGrade + "/", maxGrade)
    }

    const change = (value, position) => {
        mySolutions[position - 1] = (value);
        console.log(mySolutions)
    }

    return (
        <form action="" onSubmit={submitExam}>
            <p>{exercise.title}</p>
            {
                exercise.questions && exercise.questions.map((question) => (
                    <div>
                        <p >{question.question}</p>
                        <input type="radio" name={question._id} value="1" onChange={(e) => change(e.target.value, 1)} />
                        <label >{question.choice1}</label>
                        <br />
                        <input type="radio" name={question._id} value="2" onChange={(e) => change(e.target.value, 1)} />
                        <label >{question.choice2}</label>
                        <br />
                        <input type="radio" name={question._id} value="3" onChange={(e) => change(e.target.value, 1)} />
                        <label>{question.choice3}</label>
                        <br />
                        <input type="radio" name={question._id} value="4" onChange={(e) => change(e.target.value, 1)} />
                        <label>{question.choice4}</label>
                    </div>
                ))
            }
            <input type="submit" />
        </form>);
}

export default ExamForm;