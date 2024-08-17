import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ searchQuery, onSearchChange }: Props) => (
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
);

export default SearchBar;
