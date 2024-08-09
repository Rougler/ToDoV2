// src/components/NotificationComponent.js
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationComponent = ({ notifications, open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Notifications</DialogTitle>
      <DialogContent>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color="textSecondary" display="block">
                  {notification.timestamp}
                </Typography>
                <Button size="small" color="secondary" onClick={() => onDelete(notification.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No notifications available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationComponent;
