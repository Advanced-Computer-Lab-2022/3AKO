const CourseCard = ({course}) => {
    return (
    <div className="course">
        <p>{course.title}</p>
        <p>{course.outline}</p>
        <p>{course.summary}</p>

    </div> );
}
 
export default CourseCard;