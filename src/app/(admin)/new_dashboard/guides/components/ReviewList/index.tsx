"use client";
import React from "react";
import { Typography, Box, Rating, Divider } from "@mui/material";
import { Review } from "@/api/types/Review"; 
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <Typography>No reviews yet.</Typography>;
  }

  return (
    <PageContainer title="Reviews">
      <DashboardCard title="Reviews">
        <Box mt={2}>
          {reviews.map((review, index) => (
            <Box key={review.reviewId} mb={2}>
              <Typography variant="body1" mb={0.5}>
                {review.comment}
              </Typography>
              <Rating value={review.stars} readOnly />
              {index < reviews.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
            </Box>
          ))}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ReviewList;
