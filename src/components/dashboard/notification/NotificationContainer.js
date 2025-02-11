import React from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";

function NotificationContainer(props) {
  const { notification } = props;
  return (
    <>
      <Typography variant="body1">
        <Box component="span" sx={{ color: "text.main" }} fontWeight="bold">
          {notification?.user}
        </Box>
        {` ${notification.content}`}
      </Typography>
      <Typography variant="caption">{`${moment(
        notification.createdDate
      ).calendar()}`}</Typography>
    </>
  );
}

export default NotificationContainer;
