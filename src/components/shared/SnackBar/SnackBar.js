import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Slide, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { setSnackBar } from "../redux/SharedSlice";

function SlideTransition(props) {
  const { type, ...rest } = props;
  const theme = useTheme();

  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return theme.palette.success.light;
      case "error":
        return theme.palette.error.light;
      case "warning":
        return theme.palette.warning.light;
      case "info":
        return theme.palette.info.light;
      default:
        return theme.palette.grey[800];
    }
  };

  return (
    <Slide
      {...rest}
      direction="up"
      style={{
        backgroundColor: getBackgroundColor(type),
        borderRadius: 5,
        padding: "8px 16px",
      }}
    />
  );
}

export default function SnackBar() {
  const snackBar = useSelector((state) => state.shared.snackBar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackBar({ ...snackBar, open: false }));
  };

  return (
    <Snackbar
      open={snackBar.open}
      onClose={handleClose}
      TransitionComponent={(props) => (
        <SlideTransition {...props} type={snackBar.type} />
      )}
      message={snackBar.message}
      key={Math.random()}
      autoHideDuration={1200}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
}
