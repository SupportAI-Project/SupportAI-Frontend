import { useState } from "react";
import { Guide } from "@/api/types/Guide";
import { SelectChangeEvent } from "@mui/material";

export const useSearchGuides = (initialGuides: Guide[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("All");

  const filteredGuides = initialGuides.filter((guide) => {
    const matchesQuery = guide.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssue = selectedIssue === "All" || guide.issue === selectedIssue;
    return matchesQuery && matchesIssue;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleIssueChange = (event: SelectChangeEvent<string>) => {
    setSelectedIssue(event.target.value);
  };

  return {
    searchQuery,
    selectedIssue,
    filteredGuides,
    handleSearchChange,
    handleIssueChange,
  };
};
