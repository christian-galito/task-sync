import React from "react";
import { useDispatch } from "react-redux";

import { Button, Container, Grid2 as Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TodoList from "../todo/TodoList";
import { MobileNotificationContainer, NotificationList } from "./notification";
import "./Dashboard.css";

import { setSelectedTodo } from "../todo/redux/TodoSlice";

function Dashboard() {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setSelectedTodo(null));
    setOpenAddModal(true);
  };

  const handleClose = () => setOpenAddModal(false);

  return (
    <Container>
      <Grid container spacing={2} padding={{ sm: 4, xs: 1 }}>
        <Grid size={12}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="white"
            onClick={handleOpen}
          >
            Add Task
          </Button>
        </Grid>
        <Grid className="main-info-container" size={{ xs: 12, lg: 6 }}>
          <TodoList
            openAddModal={openAddModal}
            handleClose={handleClose}
            setOpenAddModal={setOpenAddModal}
          />
        </Grid>
        <Grid
          className="main-info-container"
          size={{ xs: 12, lg: 6 }}
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          <Paper sx={{ margin: 1 }}>
            <NotificationList />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ display: { xs: "block", lg: "none" } }}>
            <MobileNotificationContainer />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
