"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../shared/Card";
import { Box } from "@mui/material";
import GuideEditor from "../components/Editor";
import { useGuide } from "./hooks/useCreateGuide";
import { useCategories } from "../hooks/useCategories";

const Page = () => {
  const { guide, categories, register, error, handleSubmit, setValue, watch } =
    useGuide();
  return (
    <PageContainer title="Create Guide">
      <Box
        sx={{
          height: "calc(100vh - 30px)",
        }}
      >
        <DashboardCard title="Create Guide" fullHeight>
          <GuideEditor
            register={register}
            setValue={setValue}
            watch={watch}
            allCategories={categories}
            error={error}
            onSave={handleSubmit}
            initialTitle={guide?.title}
            initialContent={guide?.contentHTML}
          />
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default Page;
