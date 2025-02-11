import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { Divider, Box, Skeleton } from "@mui/material";

import NotificationContainer from "./NotificationContainer";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.card.main,
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

function MobileNotificationContainer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: mediumScreen ? "visible" : "hidden",
            right: 0,
            left: 0,
            height: "57px",
          }}
        >
          <Puller />

          {open ? (
            <Typography sx={{ p: 2 }} variant="h6" fontWeight="bold">
              Notifications
            </Typography>
          ) : notifications.length > 0 ? (
            <Typography
              variant="body1"
              sx={{
                p: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "90%",
              }}
            >
              {" "}
              <Box
                component="span"
                sx={{ color: "text.main" }}
                fontWeight="bold"
              >
                {notifications[0]?.user}
              </Box>
              {` ${notifications[0]?.content}`}
            </Typography>
          ) : (
            <Box sx={{ p: 2 }}>
              <Skeleton variant="rectangular" width="140px" />
            </Box>
          )}
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: "100%", overflow: "auto" }}>
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
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default MobileNotificationContainer;
