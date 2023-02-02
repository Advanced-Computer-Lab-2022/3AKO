import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography, Box } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Checkout = () => {
    const { user, loading } = useUserContext()
    const [data, setData] = useState('')
    const { courseId } = useParams()
    const history = useHistory()
    const [courseData, setCourseData] = useState('')
    const [price, setPrice] = useState('')
    useEffect(() => {
        if (loading) return
        if (user && user.type === 'individual trainee') {
            if (user.courseList.find((course) => { return course.courseId.toString() === courseId.toString() })) {
                // history.push(`/trainee/CourseSubtitles/${courseId}`)
                // return
            }
            axios({ method: 'get', url: 'http://localhost:5000/individualTrainee/getMyData', withCredentials: true }).then((response) => {
                console.log(response.data);
                setData(response.data)
            })
            axios({ method: 'get', url: `http://localhost:5000/course/getPriceInfo/${courseId}` }).then((response) => {
                let data = response.data
                if (!data.promotion) {
                    data.promotion = { saleEndDate: '2020-01-01', discount: 0 }
                }
                if (!data.adminPromotion) {
                    data.adminPromotion = { saleEndDate: '2020-01-01', discount: 0 }
                }
                setCourseData(data)
                let price = data.price
                let discount = !data.promotion ? 0 : (new Date(data.promotion.saleEndDate) > new Date()) ? data.promotion.discount : 0
                const adminDiscount = !data.adminPromotion ? 0 : (new Date(data.adminPromotion.saleEndDate) > new Date()) ? data.adminPromotion.discount : 0
                if (discount < adminDiscount) discount = adminDiscount
                //if(courseData.promotion) price = (new Date(courseData.promotion.saleEndDate)<new Date())? courseData.price:courseData.price-courseData.promotion.discount/100*courseData.price
                if (discount > 0) price = price - price * discount / 100

                setPrice(price)
            })
        }
    }, [loading])
    return (<div>
        {courseData && data &&

            <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', margin: '160px auto', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '20px' }}>
                <Box sx={{ my: 3, mx: 2 }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div" width={250}>
                                {courseData.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography gutterBottom variant="h6" component="div">
                                ${parseFloat(price).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography color="text.secondary" variant="body2">
                        Taught by: {courseData.instructorName}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Subject: {courseData.subject}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Total hours: {courseData.totalHours} Hours
                    </Typography>
                </Box>
                <Divider variant="middle" color='#aaa' />
                <Box sx={{ m: 2 }}>
                    <Typography gutterBottom variant="body1">
                        Your Wallet Has {parseFloat(data.wallet || 0).toFixed(2)} USD
                    </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                    <CheckoutButton courseId={courseId} price={price} wallet={data.wallet || 0} />
                </Box>
            </Box>}
    </div >);
}

export default Checkout;