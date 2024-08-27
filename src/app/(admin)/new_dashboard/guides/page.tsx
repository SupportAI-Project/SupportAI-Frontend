"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides } from "./hooks";
import { useAllGuides } from "@/hooks";
import { Guide } from "@/api/types/Guide";

const Page = () => {
  const {
    data: guideItems,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useAllGuides();

  let guides: Guide[] = [];

  if (isSuccess && "data" in guideItems) {
    guides = guideItems.data;
  }

  const { searchQuery, filteredGuides, handleSearchChange } =
    useSearchGuides(guides);

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          {isLoading && <CircularProgress />}
          {isError && <Alert severity="error">{error.message}</Alert>}
          {isSuccess && guides.length > 0 && (
            <>
              <Box mb={2}>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                />
              </Box>
              <GuideList guideItems={filteredGuides} />
            </>
          )}
          {isSuccess && guides.length === 0 && (
            <Typography>No guides available</Typography>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
