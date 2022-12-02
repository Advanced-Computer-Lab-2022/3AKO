import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
const { useParams } = require("react-router-dom")


const SubtitleExercise = () => {
    const { courseId, subtitleId } = useParams();
    //load all previous questions (editable, deletable)
    // button to add new question to the exercise

    const [subtitle, setSubtitle] = useState(null);
    const [questions, setQuestions] = useState(null);


    useEffect(() => {
        axios
            .post(`http://localhost:5000/instructor/loadSubtitle/00`, {
                courseId: courseId,
                subtitleId: subtitleId
            })
            .then((response) => {
                console.log(response.data);
                setSubtitle(response.data);
                console.log(subtitle);
                console.log("hi", response.data.subtitles[0].excercises);
                console.log('it works');
                // setQuestions(response.data.excercises[0].questions);

            }).catch((error) => {
                console.log(error); //Logs a string: Error: Request failed with status code 404
            });
        console.log("lolxd", questions);

    }, []);

    const handleAddQuestion = () => {

    }
    return (
        <div>
            {/* this block is supposed to be showing the previous questions for the same exercise.
             {questions &&
                questions.map((question) => (
                    <div>
                        <h1>{question.question}</h1>
                        <h2>{question.choice1}</h2>
                        <h2>{question.choice2}</h2>
                        <h2>{question.choice3}</h2>
                        <h2>{question.choice4}</h2>
                        <h3>{question.answer}</h3>

                    </div>
                ))} */}
            <div>
                <h1>Create New Exercise</h1>
                <label for="title">Exercise Title:</label>
                <input type="text" id="title" name="title"></input> <br />
                <form>

                    <label for="question">Question:</label>
                    <input type="text" id="question" name="question"></input> <br />
                    <label for="choice1">first choice:</label>
                    <input type="text" id="choice1" name="choice1"></input><br />
                    <label for="choice2">second choice:</label>
                    <input type="text" id="choice2" name="choice2"></input><br />
                    <label for="choice3">third choice:</label>
                    <input type="text" id="choice3" name="choice3"></input><br />
                    <label for="choice4">fourth choice:</label>
                    <input type="text" id="choice4" name="choice4"></input><br />
                    <label for="answer">Choose the correct answer:</label>
                    <select name="answers" id="answers">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select> <br />
                    <input type="submit" value="Submit"></input>
                </form>
                <button onClick={handleAddQuestion}> add question</button>

            </div>
        </div>
    );
}

export default SubtitleExercise;