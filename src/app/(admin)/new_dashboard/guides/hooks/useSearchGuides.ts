import { useState } from "react";
import { Guide } from "../types";

export const useSearchGuides = (initialGuides: Guide[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = initialGuides.filter((guide) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return {
    searchQuery,
    filteredGuides,
    handleSearchChange,
  };
};
