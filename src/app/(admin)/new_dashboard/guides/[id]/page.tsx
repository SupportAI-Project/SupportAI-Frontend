"use client";

import React from "react";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useGuide } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography, CircularProgress, Alert, Box, Divider } from "@mui/material";
import ReviewList from "../components/ReviewList";

const GuidePage: React.FC = () => {
  const params = useParams();
  
  const id = params?.id ? Number(params.id) : null;

  const { data: response, isLoading, isError, error, isSuccess } = useGuide(id ?? 0);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (isSuccess && "data" in response) {
    const guide = response.data;
    const creatorAndDateString = `Created by ${guide.creator?.username} on ${new Date(guide.createdAt).toLocaleDateString()}`;

    if (!guide.title) {
      return <Typography>Guide not found</Typography>;
    }

    return (
      <PageContainer title={guide.title}>
        <DashboardCard title={guide.title} subtitle={creatorAndDateString}>
          <div dangerouslySetInnerHTML={{ __html: guide.contentHTML }} />
        </DashboardCard>
        <Divider sx={{ mt: 2, mb: 2, border: "none" }} />
        <ReviewList guideId={guide.id} reviews={guide.reviews ?? []} />
      </PageContainer>
    );
  }

  return null; // Handle case where the component doesn't return anything
};

export default GuidePage;
