import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'
const { useParams } = require("react-router-dom")

const LessonView = ({ courseId, subtitleId, stateChanger }) => {
    // const { courseId, subtitleId } = useParams();
    const [ytLink, setYtLink] = useState('');
    const [ytId, setYtId] = useState('')
    // show everything related to the lesson, even if it's not clickable yet.
    //most probably you'll need another one for the exercises, add in modals for now. 
    const handleAddLesson = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const lesson = { vidUrl: data.get("url"), courseId, subtitleId, title: titleValue, readings: readingsValue, description: descriptionValue }
        axios({ method: "patch", url: "http://localhost:5000/instructor/addLesson", data: lesson, withCredentials: true }).then((response) => {
            console.log("we are here we finally made it boys");
            stateChanger(true)


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
    const [titleKey, setTitleKey] = useState(true)
    const [titleValue, setTitleValue] = useState('')
    const [descriptionKey, setDescriptionKey] = useState(true)
    const [descriptionValue, setDescriptionValue] = useState('')

    const [readingsKey, setReadingsKey] = useState(true)
    const [readingsValue, setReadingsValue] = useState('')

    const handleTitleBlur = () => {
        if (/\S/.test(titleValue))
            setTitleKey(false)
    }
    const handleDescriptionBlur = () => {
        if (/\S/.test(descriptionValue))
            setDescriptionKey(false)
    }
    const handleReadingsBlur = () => {
        if (/\S/.test(readingsValue))
            setReadingsKey(false)
    }




    return (
        <div>
            {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <h3 style={{ textTransform: "capitalize", width: "832px" }}>{lesson.title}</h3>
                <p className="lesson-summary">{lesson.description} </p>

                <iframe width="832" height="468" src={"https://www.youtube.com/embed/" + lesson.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <p className="lesson-summary readings">{lesson.readings}  </p>
                </div> */}


            <form onSubmit={handleAddLesson}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {titleKey ?
                        <TextField
                            value={titleValue}
                            style={{ textTransform: "capitalize", minWidth: "300px", marginRight: 'auto', marginLeft: '178px', marginBottom: '30px' }}
                            id="title" name='title' required label='Title'
                            onChange={(e) => { setTitleValue(e.target.value) }}
                            onBlur={handleTitleBlur} />
                        : <h3 style={{ textTransform: "capitalize", width: "832px", marginBottom: '20px' }}>{titleValue} <button onClick={() => { setTitleKey(true) }} style={{ border: 'none', background: 'none' }}><i class="bi bi-pencil-square"></i></button></h3>
                    }
                    {descriptionKey ?
                        <TextField
                            style={{ marginBottom: '30px' }}
                            value={descriptionValue}
                            className='lesson-summary' id="descreption" name='descreption'
                            required label='Descreption' placeholder='Lesson descreption'
                            onChange={(e) => { setDescriptionValue(e.target.value) }}
                            onBlur={handleDescriptionBlur} />
                        : <p className="lesson-summary">{descriptionValue} <button onClick={() => { setDescriptionKey(true) }} style={{ border: 'none', background: 'none' }}><i class="bi bi-pencil-square"></i></button> </p>
                    }






                    <TextField style={{ width: '832px', marginBottom: '20px' }} type='url' id="url" name='url' required label='Video Link' value={ytLink} onChange={handleLink} />
                    {ytId &&
                        <iframe style={{ marginBottom: '30px' }} width="832" height="468" src={"https://www.youtube.com/embed/" + ytId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    }
                    {readingsKey ?
                        <TextField
                            value={readingsValue}
                            className='lesson-summary' id="readings" name='readings'
                            required label='readings' placeholder='Readings'
                            onChange={(e) => { setReadingsValue(e.target.value) }}
                            onBlur={handleReadingsBlur} />
                        : <p className="lesson-summary">{readingsValue} <button onClick={() => { setReadingsKey(true) }} style={{ border: 'none', background: 'none' }}><i class="bi bi-pencil-square"></i></button> </p>
                    }
                    <Button style={{ marginLeft: 'auto', marginRight: '165px' }} variant='contained' type="submit" >Add Lesson</Button>
                </div>




            </form>
        </div>
    );
}

export default LessonView;