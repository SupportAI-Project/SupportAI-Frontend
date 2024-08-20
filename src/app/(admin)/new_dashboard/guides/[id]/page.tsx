"use client";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useGuide } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography, CircularProgress, Alert } from "@mui/material";
import { Guide } from "@/api/types/Guide";

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
            <div dangerouslySetInnerHTML={{ __html: guide.contentHTML }} />
            <Typography>
              Created by {guide.creator?.username} on{" "}
              {new Date(guide.createdAt).toLocaleDateString()}
            </Typography>
          </div>
        </DashboardCard>
      </PageContainer>
    );
  }
};

export default GuidePage;
