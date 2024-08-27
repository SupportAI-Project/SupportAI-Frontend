"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { Review } from "@/api/types/Review";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import AddReviewBox from "../AddReviewBox";
import ReviewCard from "../ReviewCard";

interface ReviewListProps {
  reviews: Review[];
  guideId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, guideId }) => {
  const [visibleCount, setVisibleCount] = useState(1); 

  const showMoreReviews = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 2, reviews.length)); 
  };

  const showLessReviews = () => {
    setVisibleCount(1);
  }

  let reviewsContext = !reviews.length ? (
    <Typography>No reviews available yet</Typography>
  ) : (
    reviews.slice(0, visibleCount).map((review, index) => (
      <ReviewCard key={index} review={review} />
    ))
  );

  return (
        <Box mt={2}>
          <Typography variant="h1" mt={2}>
            Reviews
          </Typography>
          <Divider sx={{mt:2 , mb:2}}/>
          {reviewsContext}
          {!!reviews.length && reviews.length !== 1 &&(
          <Box display="flex" justifyContent="center" width="100%" mt={2}>
            <Button onClick={()=>{
              visibleCount === reviews.length ? showLessReviews() : showMoreReviews();
            }}>
              {visibleCount === reviews.length ? "Show Less" : "Show More"}
            </Button>
          </Box>)}
          <AddReviewBox guideId={guideId ?? 0} />
        </Box>
  );
};

export default ReviewList;
