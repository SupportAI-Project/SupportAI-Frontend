"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import { Box } from "@mui/material";
import GuideEditor from "../../components/Editor";
import { useUpdateGuide } from "./hooks/useUpdateGuide";

const Page = () => {
  const { handleSave } = useUpdateGuide();

  return (
    <PageContainer title="Edit Guide">
      <Box
        sx={{
          height: "calc(100vh - 30px)",
        }}
      >
        <DashboardCard title="Edit Guide" fullHeight>
          <GuideEditor onSave={handleSave} />
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default Page;
