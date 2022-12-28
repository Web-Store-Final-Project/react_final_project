import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";

export default function CustomDeleteIconChips() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Log In"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<LoginIcon />}
      />
    </Stack>
  );
}
