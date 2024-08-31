"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides } from "./hooks";
import { useGuideItems } from "./hooks/useGuideItems";
import { useCategories } from "./hooks/useCategories";

const GuidesListPage = () => {
  const {
    guides,
    isLoadingGuides,
    guidesError,
    isGuidesError,
    isGuidesSuccess,
  } = useGuideItems();
  const {
    categories,
    error: issuesError,
    isLoading: isLoadingIssues,
  } = useCategories();
  const { 
    searchQuery, 
    selectedTag, 
    filteredGuides, 
    sortCriteria, 
    handleSearchChange, 
    handleTagChange, 
    handleSortChange 
  } =
    useSearchGuides(guides);


  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          {(isLoadingGuides || isLoadingIssues) && <CircularProgress />}
          {(isGuidesError || issuesError) && (
            <Alert severity="error">
              {guidesError?.message ||
                issuesError?.message ||
                "An error occurred"}
            </Alert>
          )}
          {isGuidesSuccess && guides.length > 0 && (
            <>
              <Box mb={2}>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  selectedTag={selectedTag}
                  onTagChange={handleTagChange}
                  categories={["All", ...categories]}  
                  sortCriteria={sortCriteria}
                  handleSortChange={handleSortChange}
                />
              </Box>
              <GuideList guideItems={filteredGuides} />
            </>
          )}
          {isGuidesSuccess && guides.length === 0 && (
            <Typography>No guides available</Typography>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default GuidesListPage;
