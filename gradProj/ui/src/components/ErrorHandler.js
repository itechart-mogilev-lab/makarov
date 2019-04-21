import React from "react";
import { Snackbar, withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function ErrorHandle(props) {
  const { classes } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(props.errors)}
      message={<span>{props.errors}</span>}
      autoHideDuration={4000}
      onClose={props.clearErrors}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="secondary"
          className={classes.close}
          onClick={props.clearErrors}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(ErrorHandle);
