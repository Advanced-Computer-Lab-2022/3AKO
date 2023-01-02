import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import ExamForm from "./components/ExamForm";
import Lesson from "./components/Lesson";
import ResponsiveDrawer from "./utility/Drawer";
import "./stylesheets/courseSubtitles.css"
import { useUserContext } from "./hooks/useUserContext";
import { Button } from "@mui/material";
import LessonView from "./components/lessonView";
import SubtitleExercise from './subtitleExercise.js'
import CourseView from "./CourseView";


const CourseSubtitles = () => {
    const { user, loading } = useUserContext()

    const [state, setState] = useState(false)
    const [materialBody, setMaterialBody] = useState(<div></div>)
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [lessonList, setLessonList] = useState([]);
    const CourseMaterials = ({ subtitle }) => {
        const [materials, setMaterials] = useState("")
        const { courseId } = useParams()
        const subtitleId = subtitle._id
        useEffect(() => {
            const temp = subtitle.lessons.concat(subtitle.exercises)
            temp.sort((a, b) => a.position - b.position)
            setMaterials(temp);

        }, [])
        const handleClick = (material) => {
            setSelectedMaterial(material)
            console.log("this is lesson ID " + material._id);

            if (material.videoURL && !(lessonList.find(e => {
                console.log(e.lessonId === material._id, e.lessonId, material._id);
                return e.lessonId === material._id
            }))) {
                axios({
                    method: 'patch', url: `http://localhost:5000/trainee/addLessonRecord`, withCredentials: true,
                    data: {
                        courseId: courseId,
                        lessonId: material._id
                    }
                }).then((response) => {
                    setLessonList([...lessonList, { lessonId: material._id, note: "" }])

                }).catch((err) => {
                })
            }
            setMaterialBody(
                <div>
                    {
                        material.questions && <ExamForm exercise={material} subtitleId={subtitleId} courseId={courseId} key={material._id} />
                    }
                    {
                        material.videoURL && <Lesson key={material._id} lesson={material} courseId={courseId} noteText={(lessonList.filter(e => e.lessonId === material._id).length > 0 ? lessonList.filter(e => e.lessonId === material._id)[0].note : "")} />
                    }
                </div>
            );
        }

        const addLesson = () => {
            setMaterialBody(<LessonView key={subtitleId} stateChanger={setState} courseId={courseId} subtitleId={subtitleId} />)
        }
        const addExercise = () => {

            setMaterialBody(<SubtitleExercise key={subtitleId} stateChanger={setState} courseId={courseId} subtitleId={subtitleId} />)

        }
        return (
            <div>
                <ToggleButtonGroup
                    style={{ width: "100%" }}
                    orientation="vertical"
                    value={selectedMaterial}
                    fullWidth
                //onChange={handleChange}
                >
                    {materials && materials.map((exercise, index) => (
                        <ToggleButton style={{ borderRadius: "0" }} value={exercise} onClick={() => { handleClick(exercise) }}>{exercise.title}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {(user && user.type == 'instructor') && <div>
                        <Button variant="outlined" onClick={addExercise} size='small' >Add Exercise</Button>
                        <Button variant="outlined" onClick={addLesson} size='small' >Add Lesson</Button>
                    </div>}
                </div>
            </div>
        );
    }
    const { courseId } = useParams()
    const [subtitles, setSubtitles] = useState([])
    useEffect(() => {
        setMaterialBody(<CourseView isWelcome={true} />)
        if (user && user.type == 'instructor') {

            axios({ method: 'get', url: `http://localhost:5000/course/getCourseInfo/${courseId}`, withCredentials: true }).then((response) => {
                // setCourse(response.data)
                setSubtitles(response.data.subtitles);
                // setPreVid(response.data.previewVideo)
            })
            // console.log("loaded0");
        }
        else if (!loading) {
            axios({ method: 'get', url: `http://localhost:5000/trainee/getSubtitles/${courseId}`, withCredentials: true }).then((response) => {

                setSubtitles(response.data)

            }).catch((err) => {
            })
        }


        if (!loading && user && !(user.type == 'instructor')) {
            axios({ method: 'get', url: `http://localhost:5000/trainee/getLessonsList/${courseId}`, withCredentials: true }).then((response) => {

                setLessonList(response.data)
            }).catch((err) => {
            })
        }


    }, [loading, state])
    return (
        <div className='course-subtitles'>
            <ResponsiveDrawer setMaterialBody={setMaterialBody} stateChanger={setState} courseId={courseId} materialBody={materialBody} drawer={
                <Accordion >
                    {subtitles && subtitles.map((subtitle, index) => (
                        <Accordion.Item eventKey={index} style={{ borderRadius: "0" }} className="accordion-item">
                            <Accordion.Header style={{ borderRadius: "0" }}>{subtitle.title}</Accordion.Header>
                            <Accordion.Body style={{ padding: "0" }}>
                                <CourseMaterials subtitle={subtitle} key={subtitle._id} />
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}


                </Accordion>} />
        </div>


    )
}
export default CourseSubtitles;