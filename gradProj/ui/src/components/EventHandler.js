import React from "react";
import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function MySnackbarContentWrapper(props) {
  const { message, onClose, ...other } = props;

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={<span>{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
      {...other}
    />
  );
}

function EventHandle(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(props.event)}
      autoHideDuration={6000}
      onClose={props.clearEvent}
    >
      <MySnackbarContentWrapper
        onClose={props.clearEvent}
        message={props.event}
      />
    </Snackbar>
  );
}

export default EventHandle;
