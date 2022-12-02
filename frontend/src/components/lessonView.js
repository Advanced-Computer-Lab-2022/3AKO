import * as React from 'react';
const { useParams } = require("react-router-dom")

const LessonView = () => {
    const { lessonId } = useParams();
    // show everything related to the lesson, even if it's not clickable yet.
    //most probably you'll need another one for the exercises, add in modals for now. 

    return (
        <div>

        </div>
    );
}

export default LessonView;