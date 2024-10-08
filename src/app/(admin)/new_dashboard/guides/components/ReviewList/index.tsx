"use client";

import React, { useState } from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import { Review } from "@/api/types/Review";
import AddReviewBox from "../AddReviewBox";
import ReviewCard from "../ReviewCard";
import DashboardCard from "../../../shared/Card";

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
  };

  let reviewsContext = !reviews.length ? (
    <Typography>No reviews available yet</Typography>
  ) : (
    reviews
      .slice(0, visibleCount)
      .map((review, index) => <ReviewCard key={index} review={review} />)
  );

  return (
    <Box mt={3}>
      <DashboardCard title={"Reviews"}>
        <Box>
          <Box sx={{ padding: 2, borderRadius: 3 }}>{reviewsContext}</Box>
          {reviews?.length > 1 && (
            <Box display="flex" justifyContent="center" width="100%">
              <Button
                onClick={() => {
                  visibleCount === reviews.length
                    ? showLessReviews()
                    : showMoreReviews();
                }}
              >
                {visibleCount === reviews.length ? "Show Less" : "Show More"}
              </Button>
            </Box>
          )}
        </Box>
      </DashboardCard>
      <AddReviewBox guideId={guideId ?? 0} />
    </Box>
  );
};

export default ReviewList;
