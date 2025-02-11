import * as React from "react";
import moment from "moment";

import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

import { Grid2 as Grid } from "@mui/material";
import { TodoCategories } from "./utility";
import { useDispatch } from "react-redux";

import { deleteTodoAsync } from "./redux/asyncActions";
import { createTodoNotificationAsync } from "../dashboard/redux/asyncActions";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifySelf: "center",
  alignSelf: "center",
  width: "90%",
  padding: theme.spacing(0.5),
  paddingTop: theme.spacing(1.5),
  margin: theme.spacing(1),
  boxShadow: "rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
}));

export default function TodoContainer(props) {
  const { todo, handleOpenTodoDetails, handleUpdateTodoDetails } = props;
  const dispatch = useDispatch();

  const handleLearnMore = (event) => {
    event.preventDefault();
    handleOpenTodoDetails(todo);
  };

  const getCategory = () => {
    const category = TodoCategories.find((c) => c.id === Number(todo.category));

    if (!category || category.id === 0) {
      return <></>;
    }

    return (
      <Typography variant="overline" color={`${category?.palette}.dark`}>
        {category?.name}
      </Typography>
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync(todo.todoId));
    dispatch(createTodoNotificationAsync({ ...todo, action: "deleted" }));
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: `${
            TodoCategories.find((c) => c.id === Number(todo.category))
              ?.palette ?? "default"
          }.main`,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: "0px", right: "21px" }}>
          {getCategory()}
        </Box>
        <CardContent>
          <Grid container>
            <Grid display="flex" size={{ md: 8, xs: 7 }} alignItems="center">
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {todo.title}
              </Typography>
            </Grid>
            <Grid
              display="flex"
              size={{ md: 4, xs: 5 }}
              flexDirection="column"
              alignItems="end"
            >
              <Typography variant="caption">{`Posted by: ${todo.createdByFirstName} ${todo.createdByLastName}`}</Typography>
              <Typography variant="caption">{`${moment(
                todo.createdDate
              ).calendar()}`}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button size="small" onClick={handleLearnMore} variant="text">
            Learn More
          </Button>
          <Box sx={{ pr: 1 }}>
            <IconButton
              size="small"
              onClick={() => handleUpdateTodoDetails(todo)}
            >
              <Edit fontSize="small" sx={{ color: "white" }} />
            </IconButton>
            <IconButton size="small" onClick={handleDelete}>
              <Delete fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
