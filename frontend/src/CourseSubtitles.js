import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"


const CourseSubtitles = () => {
    const { courseId } = useParams()
    const [subtitles, setSubtitles] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/trainee/getSubtitles/${courseId}`).then((response) => {

            setSubtitles(response.data)
        }).catch((err) => {
            console.log(err.response)

        })
    }, [])

    return (
        <div className="courses">
            {subtitles && subtitles.map((subtitle) => (
                <Link to={`/trainee/CourseMaterials/${courseId}/${subtitle._id}`}>
                    <p>{subtitle.title}</p>
                </Link>
            ))}</div>
    )

}
export default CourseSubtitles;