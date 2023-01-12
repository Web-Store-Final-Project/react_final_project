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
          {props.categories.map((category) => (
            <MenuItem value={category}>
              {category.charAt(0).toUpperCase()}
              {category.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
