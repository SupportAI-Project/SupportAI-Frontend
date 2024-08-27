"use client";
import DashboardCard from "../shared/Card";
import PageContainer from "@/components/PageContainer";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import GuideList from "./components/GuideList";
import SearchBar from "./components/SearchBar";
import { useSearchGuides } from "./hooks";
import { useAllGuides} from "@/hooks";
import { useIssue } from "@/hooks/api/issueHooks";
import { Guide } from "@/api/types/Guide";

const GuidesListPage = () => {
  const { data: guideItems, isLoading: isLoadingGuides, error: guidesError, isError: isGuidesError, isSuccess: isGuidesSuccess } = useAllGuides();
  const { data: issueData, isLoading: isLoadingIssues, error: issuesError, isError: isIssuesError, isSuccess: isIssuesSuccess } = useIssue();

  let guides: Guide[] = [];
  let tags: string[] = [];

  if (isGuidesSuccess && "data" in guideItems) {
    guides = guideItems.data;
  }

  if (isIssuesSuccess && "data" in issueData) {
    tags = issueData.data.categories.toSorted();
  }

  const { searchQuery, selectedTag, filteredGuides, handleSearchChange, handleTagChange } =
    useSearchGuides(guides);

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          {(isLoadingGuides || isLoadingIssues) && <CircularProgress />}
          {(isGuidesError || isIssuesError) && (
            <Alert severity="error">
              {guidesError?.message || issuesError?.message || "An error occurred"}
            </Alert>
          )}
          {isGuidesSuccess && isIssuesSuccess && guides.length > 0 && (
            <>
              <Box mb={2}>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  selectedTag={selectedTag}
                  onTagChange={handleTagChange}
                  tags={["All", ...tags]}  
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
