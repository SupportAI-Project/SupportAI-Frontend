import { TextField, InputAdornment, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIssue: string;
  onIssueChange: (e: SelectChangeEvent<string>) => void;
  issues: string[];
};

const SearchBar = ({ searchQuery, onSearchChange, selectedIssue, onIssueChange, issues }: Props) => (
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
    <FormControl variant="outlined" sx={{ ml: 2, minWidth: 200 }}>
      <InputLabel id="issue-filter-label">Filter by Issue</InputLabel>
      <Select
        labelId="issue-filter-label"
        value={selectedIssue}
        onChange={onIssueChange}
        label="Filter by tag"
      >
        {issues.map((issue) => (
          <MenuItem key={issue} value={issue}>
            {issue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default SearchBar;
