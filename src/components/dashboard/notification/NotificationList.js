import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

import { db } from "../../../config/fbconfig";
import NotificationContainer from "./NotificationContainer";
import { setNotifications } from "../redux/NotificationSlice";

function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "notifications"), orderBy("createdDate", "desc")),
      (snapshot) => {
        const records = [];
        snapshot.docs.forEach((doc) => {
          records.push({
            ...doc.data(),
            notificationId: doc.id,
            createdDate: doc.data().createdDate.toDate().toISOString(),
          });
        });
        dispatch(setNotifications(records));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Card sx={{ backgroundColor: "card.main" }}>
      <CardHeader title="Notifications" />
      <CardContent>
        {loading ? (
          [1, 2, 3, 4].map((id) => (
            <Box p={1} gap={1} display="flex" flexDirection="column" key={id}>
              <Skeleton
                variant="rectangular"
                height="14px"
                width="150px"
              ></Skeleton>
              <Skeleton
                variant="rectangular"
                height="10px"
                width="80px"
              ></Skeleton>
              <Divider />
            </Box>
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={notification.notificationId}>
              <NotificationContainer
                notification={notification}
                key={notification.notificationId}
              />
              {index !== notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Typography variant="subtitle1">No Records Found.</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationList;
