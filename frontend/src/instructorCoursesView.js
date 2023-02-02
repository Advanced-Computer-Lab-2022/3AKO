
import SearchAndFilter from "./components/searchAndFilter";
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link } from "@mui/material";
import { useHistory } from "react-router-dom";
const InstructorCourses = () => {
    const history = useHistory()

    const navigate = (url) => {
        history.push(url)
    }

    return (
        <div>
            <SearchAndFilter coursesFetch={`http://localhost:5000/instructor/viewMyCourses/`} subjectsFetch={`http://localhost:5000/instructor/viewMySubjects/`} isCorporateTrainee={false} instructorFilter={false} />


            <Box style={{
                position: "fixed",
                bottom: "40px",
                right: "40px",
            }} onClick={() => navigate('/instructor/addCourse')} >
                <Fab variant="extended" color='primary'>
                    <AddIcon sx={{ mr: 1 }} />
                    Create Course
                </Fab>

            </Box>
        </div>
    )
}

export default InstructorCourses;