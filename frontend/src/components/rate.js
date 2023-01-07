
import { TextField, Rating } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";

const Rate = ({ type }) => {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [hasReview, setHasReview] = useState(false)
    const { id, courseId, instructorId } = useParams()
    useEffect(() => {
        const getReviews = () => {
            var url = ''
            if (type === 'course') {
                url = `trainee/reviewedCourse/${courseId}`
            }
            else {
                url = `trainee/reviewedInstructor/${id || instructorId}`
            }
            axios({ method: 'get', url: `http://localhost:5000/${url}`, withCredentials: true })
                .then((response) => {
                    console.log(response.data);
                    if (!response.data.message) {
                        setHasReview(response.data)
                    }
                })
                .catch((e) => console.log(e))
        }
        getReviews()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        var url = ''
        let data = {
            rating: rating,
            comment: review
        }
        if (type === 'course') {
            url = 'trainee/rateCourse'
            data.courseId = courseId
        }
        else if (type === 'instructor') {
            url = 'trainee/rateInstructor'
            data.instructorId = id || instructorId
        }
        console.log(data);
        console.log({ url });
        axios({ method: 'patch', url: `http://localhost:5000/${url}`, withCredentials: true, data })
            .then((response) => {
                setHasReview(data)
                //alert("review added successfully")
            })
            .catch((e) => console.log(e))
    }

    return (
        <div>
            {!hasReview && <form onSubmit={handleSubmit} >
                <Box sx={{ p: 1, borderRadius: "0.5rem", border: "1px solid #bbb", margin: '24px' }}>

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
                    <Button variant='contained' type='submit'>add review</Button>
                </Box>
            </form >
            }
            {hasReview &&
                <Box sx={{ p: 1, borderRadius: "0.5rem", border: "1px solid #bbb", margin: '24px' }}>
                    <Typography fontWeight='bold'>Your Review</Typography>
                    {/* <Typography fontWeight="bold">{reviewer || "Anonymous "}</Typography> */}
                    <Rating value={hasReview.rating} readOnly precision={0.5} />
                    <Typography>{hasReview.comment}</Typography>
                </Box>
            }

        </div>
    )
}
export default Rate;