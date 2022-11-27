import { useEffect ,useState} from "react";
const { useParams } = require("react-router-dom")

const CourseMaterials = () => {
    const {id} = useParams()
    const [selectedLesson, setSelectedLesson] = useState('')
    

    return (
        <div>
            <div className="lessons">HELLO</div>
            <div className="title">Hi</div>
        </div>
    )

}
export default CourseMaterials;