"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Box } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides, useGuideItems, useGuides } from "./hooks";
import { Guide } from "@/api/types/Guide";

const Page = () => {
  const { data: guideItems, isLoading, isError, error } = useGuides();
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
           {isLoading && <div>Loading...</div>}
           {isError && <div>Error loading guides</div>}
           {guideItems && <GuideList guideItems={guideItems} />}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
