import { Review } from '@/api/types/Review';
import {
  Typography,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import React from 'react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        mb={3}
        sx={{
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Box display="grid" mr={10}>
          <Rating 
            value={review.rating}
            readOnly
            precision={0.5}
            sx={{ fontSize: '1.25rem', color: '#3d52a0' }}
            />
          <Typography variant="body2" color="textSecondary" >
            by {review.user?.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
              {new Date(review.createdAt).toLocaleDateString()}
           </Typography>
        </Box>
        
        <Typography variant="body1" mb={1} >
          {review.comment}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

export default ReviewCard;
