"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../shared/Card";
import { Box } from "@mui/material";
import GuideEditor from "../components/Editor";
import { useCreateGuide } from "./hooks/useCreateGuide";

const Page = () => {
  const { handleSave } = useCreateGuide();
  return (
    <PageContainer title="Create Guide">
      <Box
        sx={{
          height: "calc(100vh - 30px)",
        }}
      >
        <DashboardCard title="Create Guide" fullHeight>
          <GuideEditor onSave={handleSave} />
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default Page;
