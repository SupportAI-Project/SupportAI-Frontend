"use client";
import React from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import useAddReviewForm from '../hooks/useAddReviewForm';
import { useRouter , useSearchParams} from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AddReviewBox: React.FC = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const guideId = Number(searchParams?.get('guideId') ?? 0);

  const {
    comment,
    setComment,
    stars,
    setStars,
    validationError,
    isError,
    error,
    isPending,
    isSuccess,
    handleSubmit,
  } = useAddReviewForm(guideId);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ width: '100%' }}>

      <ArrowBackIcon 
        onClick={handleGoBack}
        sx={{mb:2 , cursor: 'pointer', fontSize: 30}}        
        />
      
      <Typography variant="h6" >Add Your Review:</Typography>
      <Box mb={2} mt={2}>
        <Rating
          name="stars"
          value={stars}
          onChange={(event, newValue) => setStars(newValue ?? 1)}
          sx={{color: '#3d52a0'}}
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
          {error?.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography color="success.main">
          Review submitted successfully!
        </Typography>
      )}
    </Box>
  );
};

export default AddReviewBox;
