import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}`;
}

export default function FilterPrice(props) {
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }} className="priceSliderBox">
      <Typography className="priceSliderBoxText">Price</Typography>
      <Slider
        getAriaLabel={() => "Price range"}
        value={props.value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={1000}
      />
      <Typography className="priceSliderBoxTextPrice">
        {props.value[0]} - {props.value[1]}
      </Typography>
    </Box>
  );
}
