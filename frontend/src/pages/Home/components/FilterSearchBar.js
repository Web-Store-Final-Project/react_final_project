import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterSearchBar(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.searchText) {
      console.log(props.searchText);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => props.setSearchText(e.target.value)}
          id="input-with-icon-textfield"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon onClick={handleSubmit} />
              </InputAdornment>
            ),
          }}
          variant="standard"
          onKeyPress={handleKeypress}
        />
      </form>
    </Box>
  );
}
