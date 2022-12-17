import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import ExamForm from "./components/ExamForm";
import Lesson from "./components/Lesson";
import ResponsiveDrawer from "./utility/Drawer";
const CourseSubtitles = () => {
    const [materialBody, setMaterialBody] = useState(<div></div>)
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [currentLesson, setCurrentLesson] = useState("");
    const CourseMaterials = ({ subtitle }) => {
        // const [subtitle, setSubtitle] = useState([])
        const [materials, setMaterials] = useState("")
        const { id, courseId, subtitleId } = useParams()
        useEffect(() => {
            const temp = subtitle.lessons.concat(subtitle.exercises)
            temp.sort((a, b) => a.position - b.position)
            setMaterials(temp);

        }, [])
        const handleClick = (material) => {
            setCurrentLesson(material.title)
            setSelectedMaterial(material)
            setMaterialBody(
                <div>
                    {
                        material.questions && <ExamForm exercise={material} subtitleId={subtitleId} courseId={courseId} key={material._id} />
                    }
                    {
                        material.videoURL && <Lesson lesson={material} />
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
            console.log(err.response)
        })
    }, [])
    return (
        <ResponsiveDrawer materialBody={materialBody} currentLesson={currentLesson} drawer={<Accordion >
            {subtitles && subtitles.map((subtitle, index) => (
                <Accordion.Item eventKey={index} style={{ borderRadius: "0" }}>
                    <Accordion.Header style={{ borderRadius: "0" }}>{subtitle.title}</Accordion.Header>
                    <Accordion.Body style={{ padding: "0" }}>
                        <CourseMaterials subtitle={subtitle} key={subtitle._id} />
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>} />
        //     <div>
        //         <div style={{ width: "15%", overflowY: "auto", height: "47vw", backgroundColor: 'white', position: "fixed" }}>
        // <Accordion >
        //     {subtitles && subtitles.map((subtitle, index) => (
        //         <Accordion.Item eventKey={index} style={{ borderRadius: "0" }}>
        //             <Accordion.Header style={{ borderRadius: "0" }}>{subtitle.title}</Accordion.Header>
        //             <Accordion.Body style={{ padding: "0" }}>
        //                 <CourseMaterials subtitle={subtitle} key={subtitle._id} />
        //             </Accordion.Body>
        //         </Accordion.Item>
        //     ))}
        // </Accordion>
        //         </div>
        //         <div style={{ display: "flex", justifyContent: "flex-end" }} >
        //             <div className="materialsBody" style={{ width: "85%" }}>
        //                 <div className="title p-3 h5 " style={{ width: "100%", backgroundColor: 'red', position: "fixed" }}>{currentLesson}</div>
        //                 {materialBody}</div>
        //         </div>
        //     </div>
    )
}
export default CourseSubtitles;