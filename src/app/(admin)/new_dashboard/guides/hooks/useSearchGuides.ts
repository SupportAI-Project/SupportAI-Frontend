import { useState } from "react";
import { Guide } from "@/api/types/Guide";
import { SelectChangeEvent } from "@mui/material";

export const useSearchGuides = (initialGuides: Guide[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortCriteria, setSortCriteria] = useState<"rating" | "date">("rating");

  const filteredGuides = initialGuides.filter((guide) => {
    const matchesQuery = guide.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "All" || guide.categories.includes(selectedTag);
    return matchesQuery && matchesTag;
  })
    .sort((a, b) => {
      if (sortCriteria === "rating") {
        const avgRatingA = a.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 1;
        const avgRatingB = b.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 1;
        return avgRatingB - avgRatingA;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTagChange = (_: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedTag(value || "All");
  };

  const handleSortChange = (event: SelectChangeEvent<string> ) => {
    setSortCriteria(event.target.value as "rating" | "date");
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
