import "../stylesheets/courseCard.css";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  CardActionArea,
  Rating,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ReviewCard from "./ReviewCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  maxWidth: 400,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#faaf00" : "#faaf00",
  },
}));

const RatingCard = ({ course }) => {
  const [listSize, setListSize] = useState(3);
  const [buttonName, setButtonName] = useState("see more");
  const [reviewer, setReviewer] = useState("");

  const count =
    course.rating["1"] +
    course.rating["2"] +
    course.rating["3"] +
    course.rating["4"] +
    course.rating["5"];
  const rate =
    (course.rating["1"] * 1 +
      course.rating["2"] * 2 +
      course.rating["3"] * 3 +
      course.rating["4"] * 4 +
      course.rating["5"] * 5) /
    count || 0;

  const maxRate = Math.max(
    course.rating["1"],
    course.rating["2"],
    course.rating["3"],
    course.rating["4"],
    course.rating["5"]
  );

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography textAlign="center" variant="h2">
              {rate.toFixed(1)}
            </Typography>
            <Rating
              value={rate}
              readOnly
              precision={0.5}
              sx={{ color: "#faaf00" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {Object.entries(course.rating).splice(0, 5)
              .map(([rating, value]) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{rating}</Typography>
                    <BorderLinearProgress
                      variant="determinate"
                      sx={{ flexGrow: 1 }}
                      value={maxRate ? (value * 100.0) / maxRate : 0}
                    />
                  </Box>
                );
              })
              .reverse()}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {course.reviews
            .map((review) => <ReviewCard review={review} />)
            .slice(0, listSize)}
        </Box>
      </Box>

      {course.reviews.length > 3 && (
        <Button
          onClick={() => {
            setListSize(course.reviews.length + 3 - listSize);
            if (buttonName == "see more") {
              setButtonName("see less");
            } else {
              setButtonName("see more");
            }
          }}
        >
          <Typography textTransform="none">{buttonName}</Typography>
        </Button>
      )}
    </Card>
  );
};

export default RatingCard;
