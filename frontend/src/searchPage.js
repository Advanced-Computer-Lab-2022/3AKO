
import SearchAndFilter from "./components/searchAndFilter";
const SearchPage = () => {

    return (
        <SearchAndFilter coursesFetch={'/course/courses'} subjectsFetch={'/course/subjects'} isCorporateTrainee={false} instrucrtorFilter={true} />
    );
}

export default SearchPage;