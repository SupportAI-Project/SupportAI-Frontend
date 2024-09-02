"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import { Box } from "@mui/material";
import GuideEditor from "../../components/Editor";
import { useUpdateGuideHook } from "./hooks/useUpdateGuide";
import { useParams } from "next/navigation";
import { useGetGuide } from "./hooks/useGetGuide";
import { useEffect } from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id ? Number(params.id) : 0;
  const { register, handleSubmit, serverError, setValue, watch } =
    useUpdateGuideHook(id);

  const { guide, isLoading } = useGetGuide(id);
  useEffect(() => {
    if (guide) {
      setValue("title", guide?.title);
      setValue("categories", guide?.categories);
      setValue("contentHTML", guide?.contentHTML);
    }
  }, [guide]);
  if (isLoading) {
    return "Loading...";
  }

  const handleSave = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <PageContainer title="Edit Guide">
      <Box
        sx={{
          height: "calc(100vh - 30px)",
        }}
      >
        <DashboardCard title="Edit Guide" fullHeight>
          <GuideEditor
            onSave={handleSave} // Ensure handleSubmit is passed correctly
            register={register}
            setValue={setValue}
            initialContent={guide?.contentHTML}
            initialTitle={guide?.title}
            categories={guide?.categories || []}
            watch={watch}
            error={serverError}
          />
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default Page;
