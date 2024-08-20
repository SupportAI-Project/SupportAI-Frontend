"use client";
import PageContainer from "@/components/PageContainer";
import { useParams } from "next/navigation";
import { useGuides } from "../hooks";
import DashboardCard from "../../shared/Card";
import { Typography } from "@mui/material";
import { Guide } from "@/api/types/Guide";

const GuidePage = () => {
  const params = useParams();

  const id = params?.id ? Number(params.id) : null;

  const { data: guideItems, isLoading, isError, isSuccess } = useGuides();

  let guide: Guide | undefined;

  if (isSuccess && guideItems && "data" in guideItems) {
    guide = guideItems.data.find((g) => g.guideId === Number(id));
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !guideItems || (isSuccess && !guide)) {
    return <Typography>Guide not found</Typography>;
  }
  if(isSuccess && guide) {
    return (
      <PageContainer title={guide.title}>
        <DashboardCard title={guide.title}>
          <div>
            <h1>{guide.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: guide.contentHTML }} />
            <Typography variant="body2">
              Created by User ID: {guide.creatorId} on{" "}
              {new Date(guide.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Stars: {guide.starsTotalSum}
            </Typography>
          </div>
        </DashboardCard>
      </PageContainer>
    );
  }
};

export default GuidePage;
