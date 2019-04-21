import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Typography, Paper, ListItem, ListItemText} from "@material-ui/core/";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      banReason: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeReason = event => {
    this.setState({ banReason: event.target.value });
  };

  handleBlockCustomer = () => {
    const query = this.props.search;

    this.props.blockCustomer({
      customerId: this.props.user._id,
      banReason: this.state.banReason,
      query
    });
    this.handleClose();
  };

  handleUnblockCustomer = () => {
    const query = this.props.search;

    this.props.unblockCustomer({
      customerId: this.props.user._id,
      query
    });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <Paper className={classes.listItem}>
        <ListItem alignItems="flex-start">
          <Avatar
            alt="Avatar"
            src="https://pp.userapi.com/c855520/v855520601/ce2c/y_WnUq8YAQ4.jpg"
            className={classes.logo}
          />
          <ListItemText
            primary={user.username}
            secondary={
              <>
                <Typography component="span" color="textPrimary">
                  <b>Adress:</b> {user.location}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Email:</b> {user.email}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Phone number:</b> {user.phone}
                </Typography>
                {user.isBanned ? (
                  <>
                    <div>Banned. Ban reason: {user.banReason}</div>
                    <Button
                      onClick={this.handleUnblockCustomer}
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                    >
                      <b>unblock user</b>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={this.handleClickOpen}
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <b>block user</b>
                  </Button>
                )}
              </>
            }
          />
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cancel book</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.banReason}
              onChange={this.handleChangeReason}
              label="Reason"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Back</Button>
            <Button
              onClick={this.handleBlockCustomer}
              variant="outlined"
              color="secondary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

const styles = theme => ({
  AvatarAndSummary: {
    display: "flex"
  },
  logo: {
    width: 125,
    height: 125,
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down(660)]: {
      display: "none"
    }
  },
  button: {
    margin: theme.spacing.unit
  }
});


export default withStyles(styles)(UserCard);