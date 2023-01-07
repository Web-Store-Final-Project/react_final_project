import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterCategory(props) {
  const handleChange = (event) => {
    props.setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select-label"
          value={props.category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={"Long Pants"}>Long Pants</MenuItem>
          <MenuItem value={"Short Pants"}>Short Pants</MenuItem>
          <MenuItem value={"T-Shirt"}>T-Shirt</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
