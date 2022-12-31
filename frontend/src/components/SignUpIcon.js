import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PortraitIcon from "@mui/icons-material/Portrait";

export default function CustomDeleteIconChips() {
  const handleClick = () => {
    //console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Sign Up"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<PortraitIcon />}
      />
    </Stack>
  );
}
