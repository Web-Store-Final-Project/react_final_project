import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FilterBrand = (props) => {
  const [resultJson, setResultJson] = useState([]);

  {
    const handleChange = (event) => {
      props.setBrand(event.target.value);
    };

    useEffect(() => {
      const fetchBrands = async () => {
        const response = await fetch("/api/items/brands");
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          setResultJson(json);
        }
      };
      fetchBrands();
    });

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="brand-select-label">Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            id="brand-select-label"
            value={props.brand}
            label="Brand"
            onChange={handleChange}
          ></Select>
        </FormControl>
      </Box>
    );
  }
};

export default FilterBrand;
