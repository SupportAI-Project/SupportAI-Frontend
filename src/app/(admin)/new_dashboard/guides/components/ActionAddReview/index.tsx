"use client";
import React from 'react';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Typography } from '@mui/material';

interface ActionAddReviewProps {
  guideId: number;
}

const ActionAddReview: React.FC<ActionAddReviewProps> = ({ guideId }) => {
  return (
    <Link href={{ pathname: '/new_dashboard/guides/add-review', query: { guideId } }} passHref>
      <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
        <AddCircleOutlineIcon /> 
        <Typography>
          Add Review
        </Typography>
      </Box>
    </Link>
  );
};

export default ActionAddReview;
