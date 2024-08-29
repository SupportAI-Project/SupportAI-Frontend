import { TextField, InputAdornment, Box, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTag: string;
  onTagChange: (e: React.ChangeEvent<{}>, value: string | null) => void;
  categories: string[];
};

const SearchBar = ({ searchQuery, onSearchChange, selectedTag, onTagChange, categories }: Props) => (
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
  </Box>
);

export default SearchBar;
