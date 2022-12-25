import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const InstructorProfileView = (props) => {
    const [instructor, setInstructor] = useState();

    useEffect(() => {
        console.log("works??")
        axios({
            method: 'post', url: `http://localhost:5000/trainee/viewInstructor`, data: {
                instructorId: props.instructorId
            }, withCredentials: true
        }).then((response) => {
            setInstructor(response.data)
            console.log("hi", response.data)
        }).catch((error) => {
            console.log(error)
        })

    }, [])


    return (
        instructor && <div>
            <h1> {instructor.name}</h1>
            <h2>{instructor.gender}</h2>
            <h3>{instructor.rating.total}</h3>
            <h3>biography</h3>
            <p>{instructor.biography}</p>
            {instructor.reviews.map((review) => (
                <div>
                    <h1> {review.rating}</h1>
                    <h2>{review.comment}</h2>
                </div>

            ))}
        </div>
    );
}

export default InstructorProfileView;