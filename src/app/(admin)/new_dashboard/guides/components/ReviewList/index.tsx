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
    <Typography>No reviews available</Typography>
  ) : (
    reviews.slice(0, visibleCount).map((review, index) => (
      <ReviewCard key={index} review={review} />
    ))
  );

  return (
    <PageContainer title="Reviews">
      <DashboardCard title="Reviews">
        <Box mt={2}>
          <Divider />
          {reviewsContext}
          {!!reviews.length &&(
          <Box display="flex" justifyContent="center" width="100%" mt={2}>
            <Button onClick={()=>{
              visibleCount === reviews.length ? showLessReviews() : showMoreReviews();
            }}>
              {visibleCount === reviews.length ? "Show Less" : "Show More"}
            </Button>
          </Box>)}
          <AddReviewBox guideId={guideId} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ReviewList;
