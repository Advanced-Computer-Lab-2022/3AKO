
import SearchAndFilter from "./components/searchAndFilter";
import { useParams } from "react-router-dom";

const InstructorCourses = () => {

    const {id} = useParams()

    return (  <SearchAndFilter coursesFetch={`/instructor/viewMyCourses/${id}`} subjectsFetch={`/instructor/viewMySubjects/${id}`} isCorporateTrainee={false} instrucrtorFilter={false}/> )
}
 
export default InstructorCourses;