
import { TextField, Rating } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Rate = ({ type, id }) => {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [hasReivew, setHasReview] = useState(false)

    useEffect(() => {
        const getReviews = () => {
            var url = ''
            if (type === 'course')
                url = 'course/reviews'
            axios.get(`http://localhost:5000/${url}/${id}`)
                .then((response) => {
                    const reviews = response.data.reviews
                    reviews.map((review) => {
                        //setHasReview(hasReivew | (review.reviewerId === traineeId))
                    })
                }
                )
                .catch((e) => console.log(e))
        }
        getReviews()
    }, [])



    const handleSubmit = () => {
        var url = ''
        let data = {
            rating: rating,
            comment: review
        }
        if (type === 'course') {
            url = '/trainee/rateCourse'
            data.courseId = id
        }
        else if (type === 'instructor') {
            url = '/trainee/rateInstructor'
            data.instructorId = id
        }

        axios({ method: 'patch', url: `http://localhost:5000/${url}`, withCredentials: true, data })
            .then(alert("review added successfully"))
            .catch((e) => console.log(e))
    }

    return (
        <div>
            {!hasReivew && <form onSubmit={handleSubmit} >
                <Rating className='rating'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)} />
                <br />
                <TextField
                    id="outlined-multiline-static"
                    label="Review"
                    multiline
                    rows={4}
                    margin="normal"
                    inputProps={{ maxLength: 200 }}
                    style={{ width: 600 }}
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                />
                <br />
                <button type='submit'>add review</button>
            </form >}
        </div>
    )
}
export default Rate;