import React, { useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { db } from "../../../config/fbconfig";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../redux/NotificationSlice";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import NotificationContainer from "./NotificationContainer";

function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

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
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Card sx={{ backgroundColor: "card.main" }}>
      <CardHeader title="Notifications" />
      <CardContent>
        {notifications.length > 0 ? (
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
