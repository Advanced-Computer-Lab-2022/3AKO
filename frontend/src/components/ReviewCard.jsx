import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Rating, Typography } from "@mui/material";
const ReviewCard = ({ review }) => {
  const [reviewer, setReviewer] = useState("");
  const getReviewer = async (ID) => {
    const res = await axios.get(`http://localhost:5000/user/getUser/${ID}`);
    if(res.data)
        setReviewer(res.data.username);
  };
  useEffect(() => {
    getReviewer(review.reviewerId);
  }, []);
  return (
    <Box sx={{ p: 1, borderRadius: "0.5rem", border: "1px solid #bbb" }}>
      <Typography fontWeight="bold">{reviewer || "Anonymous "}</Typography>
      <Rating value={review.rating} readOnly precision={0.5} />
      <Typography>{review.comment}</Typography>
    </Box>
  );
};

export default ReviewCard;
