import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"


const CourseMaterials = () => {
    const { id } = useParams()
    const [subtitles, setSubtitles] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/trainee/getSubtitles/${id}`).then((response) => {
            console.log(subtitles)
            console.log(id)
            setSubtitles(response.data)
        }).catch((err) => {
            console.log(err.response)
            console.log(id)
        })
    }, [])

    return (
        <div className="courses">
            {subtitles && subtitles.map((subtitle) => (
                <Link>
                    <p>{subtitle.title}</p>
                </Link>
            ))}</div>
    )

}
export default CourseMaterials;