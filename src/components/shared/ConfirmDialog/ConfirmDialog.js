import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  Paper,
  Slide,
  Typography,
} from "@mui/material";

import { setConfirmModal } from "../redux/SharedSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog() {
  const dispatch = useDispatch();
  const confirm = useSelector((state) => state.shared.confirmModal);

  const { open, message, onClose, onConfirm } = confirm;

  const handleClose = () => {
    dispatch(setConfirmModal({ ...confirm, open: false }));
    onClose && onClose();
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Paper
          sx={(theme) => ({
            background: theme.palette.default.main,
          })}
        >
          <Typography variant="h5" color="primary" sx={{ p: 3 }}>
            {message}
          </Typography>
          <DialogActions
            sx={{
              justifyContent: "space-around",
              width: "300px",
              borderTop: "1px solid grey",
            }}
          >
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleConfirm}>Yes</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}
