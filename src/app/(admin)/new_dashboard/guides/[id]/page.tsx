"use client";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useGuide } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography, CircularProgress, Alert, Box, Divider } from "@mui/material";
import { Guide } from "@/api/types/Guide";
import ReviewList from "../components/ReviewList";
import AddReviewBox from "../components/AddReviewBox";

const GuidePage = () => {
  const params = useParams();

  const id = params?.id ? Number(params.id) : null;
  
  
  let guide: Guide | undefined = undefined;

 const {data:response , isLoading, isError, error, isSuccess} = useGuide(id ?? 0);

 
  if (isLoading) {
    return <CircularProgress />;
  }

  if(isError) {
    return <Alert severity="error">This is an error Alert.</Alert>;
  }

  if(isSuccess && "data" in response) {
    guide = response.data;
    if(!guide.title) {
      return <Typography>Guide not found</Typography>;
    }
    return (
      <PageContainer title={guide.title}>
        <DashboardCard title={guide.title}>
          <div>
          <Typography variant="body2" sx={{ mb: 2 }}>
              Created by {guide.creator?.username} on{" "}
              {new Date(guide.createdAt).toLocaleDateString()}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: guide.contentHTML }} />
            
          </div>
        </DashboardCard>
        <Divider sx={{ mt: 2, mb: 2, border: 'none' }} />
        <ReviewList guideId={guide.guideId}/>        
      </PageContainer>
    );
  }
};

export default GuidePage;
