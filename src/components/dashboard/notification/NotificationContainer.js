import React from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

function NotificationContainer(props) {
  const { notification } = props;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: notification ? 1 : 0, x: notification ? 0 : 20 }}
      transition={{ duration: 1 }}
    >
      <Typography variant="body1">
        <Box component="span" sx={{ color: "text.main" }} fontWeight="bold">
          {notification?.user}
        </Box>
        {` ${notification.content}`}
      </Typography>
      <Typography variant="caption">{`${moment(
        notification.createdDate
      ).calendar()}`}</Typography>
    </motion.div>
  );
}

export default NotificationContainer;
