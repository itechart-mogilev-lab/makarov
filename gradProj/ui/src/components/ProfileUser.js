import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Paper } from "@material-ui/core";
import EditContainer from "../containers/EditContainer";

function UserProfile(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.main}>
        <div className={classes.AvatarAndEdit}>
          <p className={classes.username}>{props.username.toUpperCase()}</p>
          <Avatar
            alt="Avatar"
            src="https://pp.userapi.com/c855520/v855520601/ce2c/y_WnUq8YAQ4.jpg"
            className={classes.bigAvatar}
          />
        </div>
        <div className={classes.profileInfo}>
          {props.role.toUpperCase()}
          <h4 className={classes.divider}>
            <span>INFORMATION</span>
          </h4>
          <Typography>
            <b>Adress:</b> {props.location}
          </Typography>
          <Typography>
            <b>Phone number:</b> {props.phone}
          </Typography>
          <Typography>
            <b>Email:</b> {props.email}
          </Typography>
        </div>
        <h4 className={classes.divider}>
          <span>EDIT PROFILE</span>
        </h4>
        <EditContainer />
      </Paper>
    </div>
  );
}

const styles = theme => ({
  root: {
    marginTop: 20,
    padding: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    marginLeft: theme.spacing.unit * 8,
    [theme.breakpoints.down(660)]: {
      marginLeft: "57px"
    }
  },
  main: {
    padding: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 160,
    height: 160
  },
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  username: {
    margin: 0
  },
  AvatarAndUsername: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 15
  },
  AvatarAndEdit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  AvatarAndInfo: {
    display: "flex"
  }
});

export default withStyles(styles)(UserProfile);
