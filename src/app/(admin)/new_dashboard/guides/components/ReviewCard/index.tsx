import { Review } from "@/api/types/Review";
import { Typography, Box, Rating, Divider } from "@mui/material";
import React from "react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      mb={4}
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: "bg.light",
      }}
    >
      <Box display="flex" flexDirection="column" sx={{ mr: 13 }}>
        <Rating
          value={review.rating}
          readOnly
          precision={0.5}
          sx={{ fontSize: "1.25rem", color: "gold" }}
        />
        <Box ml={1}>
          <Typography fontWeight={700}>{review.user?.username}</Typography>

          <Typography color="text.primary">
            {new Date(review.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" mb={1}>
          {review.title}
        </Typography>

        <Typography variant="body1" mb={1}>
          {review.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;
