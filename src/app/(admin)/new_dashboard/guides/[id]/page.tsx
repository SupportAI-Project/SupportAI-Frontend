"use client";

import React from "react";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import DashboardCard from "../../shared/Card";

import { useGuide } from "@/hooks";

import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import ReviewList from "../components/ReviewList";
import parse from "html-react-parser";
import "quill/dist/quill.snow.css";
import { useChat } from "@/app/hooks/useChat";

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
    const creatorAndDateInfo = `Created by ${
      guide.creator?.username
    } on ${new Date(guide.createdAt).toLocaleDateString()}`;

    if (!guide.title) {
      return <Typography>Guide not found</Typography>;
    }

    return (
      <Box>
        <DashboardCard title={guide.title} subtitle={creatorAndDateInfo}>
          <Box className="quill-content">
            {parse(guide.contentHTML)}
          </Box>
        </DashboardCard>
        <ReviewList guideId={guide.id} reviews={guide.reviews ?? []} />
      </Box>
    );
  }
};

export default GuidePage;
