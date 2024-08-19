"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Box, Typography } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides, useGuides } from "./hooks";
import { Guide } from "@/api/types/Guide";

const Page = () => {
  const { data: guideItems, isLoading, isError, isSuccess } = useGuides();

  let guides: Guide[] = [];

  if (isSuccess && "data" in guideItems) {
    guides = guideItems.data;
  }

  const { searchQuery, filteredGuides, handleSearchChange } = useSearchGuides(
    guides
  );

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          {isLoading && <Typography>Loading...</Typography>}
          {isError && <Typography>Error loading guides</Typography>}
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
