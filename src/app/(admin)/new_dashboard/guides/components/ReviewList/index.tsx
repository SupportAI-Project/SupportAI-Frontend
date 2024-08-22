"use client";

import React from "react";
import {
  Typography,
  Box,
  Rating,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Review } from "@/api/types/Review";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import AddReviewBox from "../AddReviewBox";
import { useReviews } from "../../hooks";

interface ReviewListProps {
  reviews: Review[];
  guideId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, guideId }) => {
  if (!reviews.length) {
    return (
      <PageContainer title="Reviews">
        <DashboardCard title="Reviews">
          <Box mt={2}>
            <Typography>No reviews available</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <AddReviewBox guideId={guideId} />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Reviews">
      <DashboardCard title="Reviews">
        <Box mt={2}>
          {reviews.map((review, index) => (
            <Box key={review.id} mb={2}>
              <Typography>
                {review.user?.username} -{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" mb={0.5}>
                {review.comment}
              </Typography>
              <Rating value={review.rating} readOnly />
              {index < reviews.length - 1 && (
                <Divider sx={{ mt: 2, mb: 2 }} />
              )}
            </Box>
          ))}
          <Divider sx={{ mt: 2, mb: 2 }} />
          <AddReviewBox guideId={guideId} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ReviewList;
