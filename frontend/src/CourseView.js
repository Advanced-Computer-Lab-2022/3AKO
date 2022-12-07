import axios from "axios";
import { useState, useEffect } from "react";
import RatingInfo from './RatingInfo';
import { useParams } from 'react-router-dom'

const CourseView = (props) => {
    const { courseId } = useParams()
    const [courseData, setCourseData] = useState(null)
    const [exchangeRate, setExchangeRate] = useState(props.exchangeRate);
    const [currency, setCurrency] = useState(props.currency);
    useEffect(() => {
        console.log(props.currency);
        setExchangeRate(props.exchangeRate)
        setCurrency(props.currency)
    }, [props.currency])
    useEffect(() => {
        const start = async () => {
            const newData = await fetch(`/course/getCourseInfo/${courseId}`)
            const json = await newData.json()
            if (newData.ok) {
                setCourseData(json)
            }
        }
        start()
    }, [])
    return (


        <div className="courseContainer">
            {!courseData &&
                <div class="loader"></div>
            }
            {courseData && <div className="courseView">
                <h1>{courseData.title}</h1>
                <p>{courseData.summary}</p>
                {/* {<RatingInfo rating={courseData.rating} price={courseData.price * exchangeRate} promotion={(new Date(courseData.promotion.saleEndDate) > new Date() ? courseData.promotion.saleByInstructor : 0)} views={courseData.numOfViews} hours={courseData.totalHours} currency={currency}></RatingInfo>} */}
                <h2>{courseData.subject}</h2>
                <p>Subtitles :</p>
                <ol>{courseData.subtitles.map(sub => <li>{sub.title}</li>)}</ol>
                <p>Learning Outcomes :</p>
                <ul>{courseData.outlines.map((outline) => <li>{outline}</li>)}</ul>
                <div className="video">
                    <iframe width="1080" height="607.5" src={"https://www.youtube.com/embed/" + courseData.previewVideo} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>}
        </div>
    );
}

export default CourseView;