import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
const { useParams } = require("react-router-dom")

const LessonView = () => {
    const { courseId, subtitleId } = useParams();
    const [ytLink, setYtLink] = useState('');
    const [ytId, setYtId] = useState('')
    // show everything related to the lesson, even if it's not clickable yet.
    //most probably you'll need another one for the exercises, add in modals for now. 
    const handleAddLesson = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const lesson = { vidUrl: data.get("url"), courseId, subtitleId, title: data.get('title'), readings: data.get('readings'), description: data.get('describtion') }
        axios({ method: "patch", url: "http://localhost:5000/instructor/addLesson", data: lesson, withCredentials: true }).then((response) => {
            console.log("we are here we finally made it boys");
        })
    }
    const handleLink = (e) => {
        setYtLink(e.target.value)
        const reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = (e.target.value).match(reg)
        if ((match && match[1].length === 11)) {
            setYtId(match[1])
        }
    }


    return (
        <div>

            <form onSubmit={handleAddLesson}>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required></input> <br />
                <label for="describtion">describtion:</label>
                <input type="text" id="describtion" name="describtion" required></input> <br />
                <label for="url">url:</label>
                <input type="url" id="url" name="url" required value={ytLink} onChange={handleLink}></input> <br />
                <label for="readings">readings:</label>
                <input type="text" id="readings" name="readings" required></input> <br />
                <input type="submit" value={"add lesson"} />
            </form>
            {ytId && <div>
                <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + ytId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

            </div>
            }
        </div>
    );
}

export default LessonView;