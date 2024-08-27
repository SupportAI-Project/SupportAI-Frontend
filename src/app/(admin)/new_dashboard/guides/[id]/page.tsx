"use client";

import React from "react";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useGuide } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography, CircularProgress, Alert, Box, Divider } from "@mui/material";
import ReviewList from "../components/ReviewList";
import parse from "html-react-parser";
import "quill/dist/quill.snow.css";
import { useGlobalContacts } from "@/app/hooks/useGlobalContacts";
import ChatPopup from "../../components/ChatPopup";

const GuidePage: React.FC = () => {
  const params = useParams();
  
  const id = params?.id ? Number(params.id) : null;

  const { data: response, isLoading, isError, error, isSuccess } = useGuide(id ?? 0);

  const {selectedContact} = useGlobalContacts();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (isSuccess && "data" in response) {
    const guide = response.data;
    const creatorAndDateInfo = `Created by ${guide.creator?.username} on ${new Date(guide.createdAt).toLocaleDateString()}`;

    if (!guide.title) {
      return <Typography>Guide not found</Typography>;
    }

    return (
      <Box>
        <Typography variant="h1">{guide.title}</Typography>
        <Typography variant="subtitle1">{creatorAndDateInfo}</Typography>
        <Box className="quill-content">
          {parse(guide.contentHTML)}
        </Box>
        <Divider sx={{ mt: 2, mb: 2, border: "none" }} />
        <ReviewList guideId={guide.id} reviews={guide.reviews ?? []} />
        <Divider sx={{ mt: 5, mb: 5, border: "none" }} />
        {selectedContact && <ChatPopup selectedContact={selectedContact} />}
      </Box>
    );
  }

};

export default GuidePage;
