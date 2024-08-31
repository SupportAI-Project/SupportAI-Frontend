import { 
  TextField, 
  InputAdornment, 
  Box, 
  FormControl, 
  Select, 
  MenuItem,
  SelectChangeEvent
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
  handleSortChange: (e: SelectChangeEvent<string>) => void;
};


const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedTag, 
  onTagChange, 
  categories, 
  sortCriteria, 
  handleSortChange 
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
          <TextField
            {...params}
            label="Filter by tag"
            variant="outlined"
          />
        )}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
      />
    </FormControl>
    <FormControl variant="outlined" sx={{ ml: 2, minWidth: 150 }}>
      <Select
        onChange={handleSortChange}
        displayEmpty
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            Sort by {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default SearchBar;
