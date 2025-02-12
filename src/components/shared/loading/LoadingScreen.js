import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function SimpleBackdrop() {
  return (
    <Backdrop
      sx={{ color: "#00000080", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
