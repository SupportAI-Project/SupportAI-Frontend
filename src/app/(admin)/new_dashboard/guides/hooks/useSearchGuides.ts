import { useState } from "react";
import { Guide } from "@/api/types/Guide";
import { SelectChangeEvent } from "@mui/material";
import { SortCriteria } from "../types";
import { sortByCriteria } from "./sortGuides";

export const useSearchGuides = (initialGuides: Guide[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("rating");

  const filteredGuides = sortByCriteria(
    initialGuides.filter((guide) => {
      const matchesQuery = guide.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || guide.categories.includes(selectedTag);
      return matchesQuery && matchesTag;
    }),
    sortCriteria
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTagChange = (_: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedTag(value || "All");
  };

  const handleSortChange = (event: SelectChangeEvent<string> ) => {
    setSortCriteria(event.target.value as SortCriteria);
  };

  return {
    searchQuery,
    selectedTag,
    sortCriteria,
    filteredGuides,
    handleSearchChange,
    handleTagChange,
    handleSortChange,
  };
};
