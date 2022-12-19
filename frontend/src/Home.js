
import SearchAndFilter from "./components/searchAndFilter";
const Home = () => {

  return (
    <SearchAndFilter coursesFetch={'/course/courses'} subjectsFetch={'/course/subjects'} isCorporateTrainee={false} instrucrtorFilter={true} />
  );
}

export default Home;