import * as React from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 2,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 5,
      width: 2,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 2,
  },
}));

function PriceThumbComponent(props) {
  const { children, ...other } = props;
  return <SliderThumb {...other}>{children}</SliderThumb>;
}

PriceThumbComponent.propTypes = {
  children: PropTypes.node,
};

export default function CustomizedSlider() {
  return (
    <Box className="priceSliderBox">
      <Box sx={{ m: 3 }} />
      <p className="priceSliderBoxText">Price</p>
      <PriceSlider
        slots={{ thumb: PriceThumbComponent }}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        defaultValue={[0, 1000]}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
