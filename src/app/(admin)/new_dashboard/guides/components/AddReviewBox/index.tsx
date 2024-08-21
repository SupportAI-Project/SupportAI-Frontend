import React, { useState } from 'react';
import { useAddReview } from '../../hooks';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import { CreateReviewDto,CreateReviewSchema } from '../../dto/CreateReviewDto';

interface AddReviewBoxProps {
    guideId: number;
}

const AddReviewBox: React.FC<AddReviewBoxProps> = ({ guideId }) => {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const {mutate, isError,error,isPending,isSuccess} = useAddReview();

  const handleSubmit = () => {
    const newReview: CreateReviewDto = {
        guideId,
        stars: stars ?? 0,
        comment: comment.trim() || undefined,
    };
    const validation = CreateReviewSchema.safeParse(newReview);
    if (!validation.success) {
        setValidationError(validation.error.errors.map((err) => err.message).join(", "));
        return;
    }

    mutate(validation.data,{
        onSuccess: () => {
            setComment('');
            setStars(5);
        }
    });
  };

  return (
    <Box>
      <Typography variant="h6">Add Your Review</Typography>
      <Box mb={2}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="stars"
          value={stars}
          onChange={(event, newValue) => setStars(newValue ?? 1)}
        />
      </Box>
      <TextField
        label="Write your comment (optional)"
        multiline
        fullWidth
        minRows={3}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isPending}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPending || stars === null}
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Box>
      {validationError && (
        <Typography color="error">{validationError}</Typography>
      )}
      {isError && (
        <Typography color="error">
          Error: {error.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success.main">Review submitted successfully!</Typography>
      )}
    </Box>
  );
};

export default AddReviewBox;