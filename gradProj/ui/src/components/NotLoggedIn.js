import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import withLayout from "./Layout";

function Profile(props) {
  const goBack = () => {
    props.history.goBack();
  };

  const { classes } = props;
  return (
    <div className={classes.container}>
      <img className={classes.image} alt="¯\_(ツ)_/¯" src="https://scontent-frt3-2.xx.fbcdn.net/v/t1.0-9/57008997_857822647884248_5773246471793016832_n.jpg?_nc_cat=111&_nc_ht=scontent-frt3-2.xx&oh=9ca6b2f7f00b9b9fa69c5ee78d74f70d&oe=5D485752" />
      <Typography variant="h5">This page only for authorized users, so... </Typography>
      <Button
        to="/signIn"
        component={Link}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Login/Signup
      </Button>
      <Button onClick={goBack} color="primary">
        Go back
      </Button>
    </div>
  );
}

const styles = theme => ({
  image: {
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      width: "400px",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit *8
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withRouter(withStyles(styles)(withLayout(Profile)));
