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

const CourseSubtitles = () => {
    const [materialBody, setMaterialBody] = useState(<div></div>)
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [currentLesson, setCurrentLesson] = useState("");
    const [lessonList, setLessonList] = useState([]);
    const CourseMaterials = ({ subtitle }) => {
        // const [subtitle, setSubtitle] = useState([])
        const [materials, setMaterials] = useState("")
        const { courseId } = useParams()
        const subtitleId = subtitle._id
        useEffect(() => {
            const temp = subtitle.lessons.concat(subtitle.exercises)
            temp.sort((a, b) => a.position - b.position)
            setMaterials(temp);

        }, [])
        const handleClick = (material) => {
            setCurrentLesson(material.title)
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
        return (

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
        );
    }
    const { courseId } = useParams()
    const [subtitles, setSubtitles] = useState([])
    useEffect(() => {
        axios({ method: 'get', url: `http://localhost:5000/trainee/getSubtitles/${courseId}`, withCredentials: true }).then((response) => {

            setSubtitles(response.data)

        }).catch((err) => {
        })
        axios({ method: 'get', url: `http://localhost:5000/trainee/getLessonsList/${courseId}`, withCredentials: true }).then((response) => {

            setLessonList(response.data)
        }).catch((err) => {
        })


    }, [])
    return (
        <ResponsiveDrawer materialBody={materialBody} currentLesson={currentLesson} drawer={<Accordion >

            {subtitles && subtitles.map((subtitle, index) => (
                <Accordion.Item eventKey={index} style={{ borderRadius: "0" }} className="accordion-item">
                    <Accordion.Header style={{ borderRadius: "0" }}>{subtitle.title}</Accordion.Header>
                    <Accordion.Body style={{ padding: "0" }}>
                        <CourseMaterials subtitle={subtitle} key={subtitle._id} />
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>} />

    )
}
export default CourseSubtitles;