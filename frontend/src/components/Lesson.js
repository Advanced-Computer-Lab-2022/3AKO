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
                <p className="lesson-summary">{lesson.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, totam!</p>

                <iframe width="832" height="468" src={"https://www.youtube.com/embed/" + lesson.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <p className="lesson-summary readings">{lesson.readings} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias excepturi numquam voluptas, iste impedit rem placeat a. Possimus iure suscipit incidunt quidem quibusdam aut, tempora veritatis saepe provident! Perspiciatis minima, reprehenderit fugit accusamus doloremque eius saepe architecto? Et qui corporis iusto iure aliquid dolor? Quasi molestiae possimus, officia quis autem nostrum perferendis harum aspernatur placeat modi obcaecati dolores, odit ullam nobis. Temporibus nam placeat nobis itaque. Quibusdam perferendis omnis, quidem repellat aliquid, voluptas a porro ipsum reiciendis dolores neque, impedit quae obcaecati praesentium aut tempore dicta atque dolor enim! A inventore ex repudiandae, numquam quod optio amet adipisci praesentium quo? </p>

                {!user.type == 'instructor' &&
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