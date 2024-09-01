import {
  TextField,
  InputAdornment,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import { SortCriteria, sortOptions } from "../../types";

type Props = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTag: string;
  onTagChange: (e: React.ChangeEvent<{}>, value: string | null) => void;
  categories: string[];
  sortCriteria: SortCriteria;
  handleSortChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  categories,
  sortCriteria,
  handleSortChange,
}: Props) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <TextField
      fullWidth
      label="Search Guides"
      variant="outlined"
      value={searchQuery}
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
    <FormControl variant="outlined" sx={{ ml: 2, minWidth: 290 }}>
      <Autocomplete
        options={[...categories]}
        value={selectedTag}
        onChange={onTagChange}
        renderInput={(params) => (
          <TextField {...params} label="Filter by tag" variant="outlined" />
        )}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
      />
    </FormControl>
    <FormControl variant="outlined" sx={{ ml: 2, minWidth: 150 }}>
      <TextField
        select
        label="Sort by"
        value={sortCriteria}
        onChange={(e) => handleSortChange(e)}
        variant="outlined"
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  </Box>
);

export default SearchBar;
