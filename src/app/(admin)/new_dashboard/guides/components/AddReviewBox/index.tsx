"use client";
import React from 'react';
import { Box, Typography, Rating, TextField, Button, CircularProgress, Alert } from '@mui/material';
import useAddReviewForm from '../../hooks/useAddReviewForm';
import DashboardCard from '../../../shared/Card';

interface AddReviewBoxProps {
  guideId: number;
}

const AddReviewBox: React.FC<AddReviewBoxProps> = ({ guideId }) => {

  const {
    comment,
    setComment,
    title,
    setTitle,
    stars,
    setStars,
    validationError,
    isError,
    error,
    isPending,
    isSuccess,
    handleSubmit,
  } = useAddReviewForm(guideId);

  if (!guideId) {
    return <Alert severity="error">Guide not found</Alert>;
  }

  return (
   <DashboardCard title={"Add Your Review"}> 
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      sx={{ mt: 2 }} >
      <Box mb={2} mt={2}>
        <Rating
          name="stars"
          value={stars}
          onChange={(event, newValue) => {
            setStars(newValue ?? 1);
          }}
        />
      </Box>
      <TextField
        label="Review Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Write your comment (optional)"
        multiline
        fullWidth
        minRows={3}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPending}
          sx={{ mb: 2 }}
        >
          {isPending ? <CircularProgress size={24} /> : 'Submit'}
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
  </DashboardCard>
  );
};

export default AddReviewBox;
