const Lesson = ({ lesson }) => {
    return (
        <div>
            <p>{lesson.description}</p>
            <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + lesson.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>{lesson.readings}</p>
        </div>
    );
}

export default Lesson;