import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Modal,
  MenuItem,
  Select,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import { createTodoNotificationAsync } from "../dashboard/redux/asyncActions";
import { createTodoAsync, updateTodoAsync } from "./redux/asyncActions";
import { TodoCategories } from "./utility";

const Card = styled(MuiCard)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function TodoAddModal(props) {
  const { open, handleClose } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({ category: 0 });
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);

  React.useEffect(() => {
    if (open) {
      selectedTodo ? setFormData(selectedTodo) : setFormData({ category: 0 });
    }
  }, [open, selectedTodo]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formValues = {
      title: data.get("title").trim(),
      content: data.get("content").trim(),
      category: data.get("category"),
      action: selectedTodo ? "updated" : "added",
    };

    Promise.all([
      selectedTodo
        ? dispatch(
            updateTodoAsync({ ...formValues, todoId: selectedTodo.todoId })
          )
        : dispatch(createTodoAsync(formValues)),
      dispatch(createTodoNotificationAsync(formValues)),
    ]);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
        >
          {selectedTodo ? "Edit Task" : "Add Task"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <TextField
              autoComplete="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
              id="title"
            />
          </FormControl>
          <FormControl>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                  id="category"
                  name="category"
                  fullWidth
                  value={formData.category}
                  onChange={handleChange}
                >
                  {TodoCategories.map((category) => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="content">Content</FormLabel>
            <TextField
              fullWidth
              name="content"
              autoComplete="content"
              variant="outlined"
              value={formData.content}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </Modal>
  );
}
