import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ExamForm from "./components/ExamForm";
import Lesson from "./components/Lesson";
const CourseMaterials = () => {
    const [subtitle, setSubtitle] = useState([])
    const [materials, setMaterials] = useState("")
    const [materialBody, setMaterialBody] = useState(<div>Hi</div>)
    const { id, courseId, subtitleId } = useParams()
    useEffect(() => {
        axios({method:'get',url:`http://localhost:5000/trainee/loadSubtitle/${courseId}/${subtitleId}`,withCredentials:true}).then((response) => {
            setSubtitle(response.data)
            const temp = response.data.lessons.concat(response.data.exercises)
            temp.sort((a, b) => a.position - b.position)
            setMaterials(temp);
        }).catch((err) => {
            console.log(err.response)
        })

        console.log(materials)
    }, [])

    const handleClick = (material) => {
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
        <div>
            <div className="courses">
                {materials && materials.map((exercise,index) => (

                    <div className="courses" key={index}>


                        <button onClick={() => { handleClick(exercise) }}>{exercise.title}</button>
                        {/* {exercise.questions && exercise.questions.map((question) => (
                            <p >{question.question}</p>
                        ))} */}

                    </div>

                ))}
                <div>{materialBody}</div>
            </div>
            {subtitle.title}
        </div>
    );
}

export default CourseMaterials; 