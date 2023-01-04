import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [brand, setBrand] = React.useState("");

  const handleChange = (event) => {
    setBrand(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="brand-select-label">Brand</InputLabel>
        <Select
          labelId="brand-select-label"
          id="brand-select-label"
          value={brand}
          label="Brand"
          onChange={handleChange}
        >
          <MenuItem value={1}>Billabong</MenuItem>
          <MenuItem value={2}>Quicksilver</MenuItem>
          <MenuItem value={3}>Burton</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
