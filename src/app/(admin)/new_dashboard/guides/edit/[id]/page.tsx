"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "../../../shared/Card";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import GuideEditor from "../../components/Editor";
import { useGuide, useUpdateGuide } from "../../hooks/guideClientHooks";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const handleSave = useUpdateGuide();
  const params = useParams();
  const router = useRouter();

  const id = params?.id ? Number(params.id) : 0;

  const handleOnSave = (id: number, title: string, contentHTML: string) => {
    handleSave.mutate({ id, guide: { title, contentHTML } });
  };

  const {
    data: response,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGuide(id ?? 0);

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
      <PageContainer title="Edit Guide">
        <Box
          sx={{
            height: "calc(100vh - 30px)",
          }}
        >
          <DashboardCard title="Edit Guide" fullHeight>
            <GuideEditor
              onSave={(title, content) => handleOnSave(id, title, content)}
              initialTitle={guide.title}
              initialContent={guide.contentHTML}
            />
          </DashboardCard>
        </Box>
      </PageContainer>
    );
  }
};

export default Page;
