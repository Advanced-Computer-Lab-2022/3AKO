
import SearchAndFilter from "./components/searchAndFilter";
import { useParams } from "react-router-dom";

const InstructorCourses = () => {

    return ( 
    
        <SearchAndFilter coursesFetch={`http://localhost:5000/instructor/viewMyCourses/`} subjectsFetch={`http://localhost:5000/instructor/viewMySubjects/`} isCorporateTrainee={false} instrucrtorFilter={false}/>
    
    )
}
 
export default InstructorCourses;