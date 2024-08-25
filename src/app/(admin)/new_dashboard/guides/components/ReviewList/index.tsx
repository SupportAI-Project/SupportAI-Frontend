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
import ReviewCard from "../ReviewCard";

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
          <Divider sx={{ mt: 2, mb: 2 }} />
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ReviewList;
