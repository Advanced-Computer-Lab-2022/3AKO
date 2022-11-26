
import SearchAndFilter from "./components/components/searchAndFilter";
import CourseCard from './components/courseCard';

const Home = () => {

    return ( 
      <SearchAndFilter coursesFetch={'/course/courses'} subjectsFetch={'/course/subjects'} isCorporateTrainee={false} instrucrtorFilter={true} />
    );
}
 
export default Home;