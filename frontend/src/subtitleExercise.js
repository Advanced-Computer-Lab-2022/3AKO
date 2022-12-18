import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
const { useParams } = require("react-router-dom")


const SubtitleExercise = () => {
    const { courseId, subtitleId, exerciseId } = useParams();
    //load all previous questions (editable, deletable)
    // button to add new question to the exercise

    const [exercise, setExercise] = useState(null);
    const [questions, setQuestions] = useState(null);


    useEffect(() => {
        axios({
            method: 'post', url: `http://localhost:5000/instructor/loadExercise`, data: {
                courseId: courseId,
                subtitleId: subtitleId,
                exerciseId: exerciseId
            }, withCredentials: true
        })
            .then((response) => {
                console.log(response.data);
                setExercise(response.data);
                console.log(exercise);
                // console.log("hi", response.data.subtitles[0].excercises);
                console.log('it works');
                setQuestions(response.data.questions);

            }).catch((error) => {
                console.log(error); //Logs a string: Error: Request failed with status code 404
            });
        console.log("lolxd", questions);

    }, []);

    const handleAddQuestion = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const question = { courseId, exerciseId, subtitleId, questionContent: data.get('question'), choice1: data.get('choice1'), choice2: data.get('choice2'), choice3: data.get('choice3'), choice4: data.get('choice4'), answer: data.get('answer') }
        const addQuestion = async () => {
            await axios({ method: 'patch', url: 'http://localhost:5000/instructor/addQuestion', withCredentials: true, data: question }).then((response) => {
                setQuestions([...questions, response.data])
            }).catch((err) => {
                console.log(err);
            })

        }
        addQuestion()
    }
    return (
        <div>
            this block is supposed to be showing the previous questions for the same exercise.
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
                ))}
            <div>
                <h1>{exercise && exercise.title}</h1>
                <form onSubmit={handleAddQuestion}>

                    <label for="question">Question:</label>
                    <input type="text" id="question" name="question" required></input> <br />
                    <label for="choice1">first choice:</label>
                    <input type="text" id="choice1" name="choice1" required></input><br />
                    <label for="choice2">second choice:</label>
                    <input type="text" id="choice2" name="choice2" required></input><br />
                    <label for="choice3">third choice:</label>
                    <input type="text" id="choice3" name="choice3" required></input><br />
                    <label for="choice4">fourth choice:</label>
                    <input type="text" id="choice4" name="choice4" required></input><br />
                    <label for="answer">Choose the correct answer:</label>
                    <select name="answer" id="answer" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select> <br />
                    <input type="submit" value="Add Question"></input>
                </form>
            </div>
        </div>
    );
}

export default SubtitleExercise;