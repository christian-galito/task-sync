import * as React from "react";
import moment from "moment";
import { onSnapshot, doc } from "firebase/firestore";

import { Box, Typography, Modal, CardContent } from "@mui/material";
import MuiCard from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

import { db } from "../../config/fbconfig";
import { CardHeader, Divider, Grid2 as Grid, IconButton } from "@mui/material";
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
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "800px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

function TodoDetailsModal(props) {
  const { open, todoId, handleClose } = props;
  const [selectedTodo, setSelectedTodo] = React.useState();

  const category = TodoCategories.find(
    (c) => c.id === Number(selectedTodo?.category)
  );

  React.useEffect(() => {
    if (!todoId) return;

    const docRef = doc(db, "todos", todoId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSelectedTodo({
            ...docSnap.data(),
            createdDate: docSnap.data().createdDate.toDate().toISOString(),
            lastUpdatedDate: docSnap
              .data()
              .lastUpdatedDate?.toDate()
              .toISOString(),
          });
        } else {
          setSelectedTodo(null);
        }
      },
      (err) => {
        console.error("Error fetching document:", err);
      }
    );

    return () => unsubscribe();
  }, [todoId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: `${category?.palette}.main`,
          }}
        >
          <CardHeader
            title={
              <Typography variant="h5" color="white" fontWeight="bold">
                {selectedTodo?.title}
              </Typography>
            }
            action={
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent sx={{ pl: 3 }}>
            <Typography variant="subtitle1" color="white">
              {selectedTodo?.content}
            </Typography>
            <br />
            <Divider />
            <Typography
              variant="overline"
              sx={{ color: `${category?.palette}.dark` }}
            >
              {category?.name}
            </Typography>
            <Grid container>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" fontStyle="italic">
                  Created By:
                </Typography>
                <Typography variant="body1">
                  {`${selectedTodo?.createdByFirstName} ${selectedTodo?.createdByLastName}`}
                </Typography>
                <Typography variant="caption">
                  {moment(selectedTodo?.createdDate).calendar()}
                </Typography>
              </Grid>
              {selectedTodo?.lastUpdatedByFirstName && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" fontStyle="italic">
                    Last Modified By:
                  </Typography>
                  <Typography variant="body2">
                    {`${selectedTodo?.lastUpdatedByFirstName} ${selectedTodo?.lastUpdatedByLastName}`}{" "}
                  </Typography>
                  <Typography variant="caption">
                    {moment(selectedTodo?.lastUpdatedDate).calendar()}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default TodoDetailsModal;
