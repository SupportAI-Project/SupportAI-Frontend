"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Box, Typography } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides, useGuideItems, useGuides } from "./hooks";
import { Guide } from "@/api/types/Guide";

const Page = () => {
  const { data: guideItems, isLoading, isError, error } = useGuides();

  let content;
  
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (isError || !guideItems) {
    content = <Typography>Error loading guides</Typography>;
  } else if ("error" in guideItems) {
    content = (
      <Typography color="error">
        Error: {guideItems.message} (Status Code: {guideItems.statusCode})
      </Typography>
    );
  } else {
    content = <GuideList guideItems={guideItems} />;
  }
  // const { searchQuery, filteredGuides, handleSearchChange } =
  //   useSearchGuides(guideItems);

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          {/* <Box mb={2}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </Box> */}
          {content}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
