"use client";

import React from "react";
import {
  Typography,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import { Review } from "@/api/types/Review";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import AddReviewBox from "../../add-review/page";
import ActionAddReview from "../ActionAddReview";

interface ReviewListProps {
  reviews: Review[];
  guideId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, guideId }) => {
  if (!reviews.length) {
    return (
      <PageContainer title="Reviews">
        <DashboardCard 
          title="Reviews" 
          action={<ActionAddReview guideId={guideId} />}
        >
          <Box mt={2}>
            <Typography>No reviews available</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <AddReviewBox />
          </Box>
        </DashboardCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Reviews">
      <DashboardCard 
        title="Reviews" 
        action={<ActionAddReview guideId={guideId} />}
      >
        <Box mt={2}>
          {reviews.map((review, index) => (
            <Box
              display="grid"
              key={review.id}
              mb={1}
              sx={{
                backgroundColor: index % 2 === 0 ? "#f8f8f8" : "#7091e6",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2">
                  {review.user?.username} —{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body1" mb={0.5}>
                {review.comment}
              </Typography>
            </Box>
          ))}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ReviewList;
