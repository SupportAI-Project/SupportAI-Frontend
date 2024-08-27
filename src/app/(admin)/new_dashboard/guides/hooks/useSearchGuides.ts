import { useState } from 'react';
import { Guide } from '@/api/types/Guide';

export const useSearchGuides = (initialGuides: Guide[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredGuides = initialGuides.filter((guide) => {
    const matchesQuery = guide.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === 'All' || guide.tags.includes(selectedTag);
    return matchesQuery && matchesTag;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTagChange = (_: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedTag(value || 'All');
  };

  return {
    searchQuery,
    selectedTag,
    filteredGuides,
    handleSearchChange,
    handleTagChange,
  };
};
