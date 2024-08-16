"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Box } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides, useGuideItems } from "./hooks";
const Page = () => {
  const { guideItems } = useGuideItems();
  const { searchQuery, filteredGuides, handleSearchChange } =
    useSearchGuides(guideItems);

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          <Box mb={2}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </Box>
          <GuideList guides={filteredGuides} />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
