import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MdEditNote } from "react-icons/md";
import PersistentDrawerRight from "../utility/LessonDrawer"
import { useUserContext } from "../hooks/useUserContext";


const Lesson = ({ lesson, courseId, noteText }) => {
    const { user, loading } = useUserContext()

    const [notesOpen, setNotesOpen] = React.useState("none")

    return (

        <PersistentDrawerRight key={lesson._id} noteText={noteText} openNote={notesOpen} courseId={courseId} lessonId={lesson._id} lesson={
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <h3 style={{ textTransform: "capitalize", width: "832px" }}>{lesson.title}</h3>
                <p className="lesson-summary">{lesson.description} </p>

                <iframe width="832" height="468" src={"https://www.youtube.com/embed/" + lesson.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <p className="lesson-summary readings">{lesson.readings} </p>

                {user.type !== 'instructor' &&
                    <Box style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "40px",
                    }} >
                        <Fab color="primary" aria-label="add" onClick={() => { setNotesOpen(!notesOpen) }}>
                            <MdEditNote style={{ width: "27px", height: "27px" }} />
                        </Fab>

                    </Box>}
            </div>
        } />



    );
}

export default Lesson;