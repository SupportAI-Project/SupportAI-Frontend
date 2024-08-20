"use client";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useAllGuides, useGuide } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography,Rating } from "@mui/material";
import { Guide } from "@/api/types/Guide";

const GuidePage = () => {
  const params = useParams();

  const id = params?.id ? Number(params.id) : null;
  
  
  let guide: Guide | undefined = undefined;

 const {data:response , isLoading, isError, isSuccess} = useGuide(id ?? 0);

 
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if(isError) {
    return <Typography>Error</Typography>;
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
            <Typography variant="body2">
              Created by {guide.creator?.username} on{" "}
              {new Date(guide.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <Rating
                value={3}
                precision={0.5}
                readOnly
              />
            </Typography>
            <Typography>length {guide.reviews?.length}</Typography>
          </div>
        </DashboardCard>
      </PageContainer>
    );
  }
};

export default GuidePage;
