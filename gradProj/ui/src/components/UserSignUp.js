import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Formik } from "formik";
import UserSchema from "../schemas/SignUpUserSchema";
import { TextField, Link } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      push: false,
      redirectUrl: null
    };
  }

  handleExecutorSignUp = () => {
    this.setState({
      push: true,
      redirectUrl: "/signup-executor"
    });
  };

  componentDidUpdate(prevState) {
    const { redirectUrl } = this.state;

    // If component is rendered on redirect page as well
    // (i.e. header or footer) it would cause redirect-loop
    // as "<Redirect />" is being rendered every time.
    // So we are resetting the state after redirect
    if (!prevState.redirectUrl && redirectUrl) {
      this.setState({
        push: false,
        redirectUrl: null
      });
    }
  }

  handleMessage = (msg, variant) => {
    this.props.enqueueSnackbar(msg, { variant });
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          phone: "",
          location: "",
          confirmPassword: ""
        }}
        onSubmit={(values, { setFieldError }) => {
          try {
            this.props.userSignUp(values);
          } catch (errors) {
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        validationSchema={UserSchema}
        component={this.form}
      />
    );
  }

  form = ({ values, errors, handleBlur, handleChange, handleSubmit }) => {
    const { classes } = this.props;
    const { redirectUrl, push } = this.state;
    if (redirectUrl) {
      return <Redirect push={push} to={redirectUrl} />;
    }
    return (
      <div className={classes.main} onSubmit={handleSubmit}>
        <CssBaseline />
        <Snackbar
         className={classes.snack}        
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={Boolean(this.props.error)}
          message={<span>{this.props.error}</span>}
          autoHideDuration={2000}
          onClose={this.props.clearErrors}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              className={classes.close}
              onClick={this.props.clearErrors}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Typography component="h1" variant="subtitle1">
            as User
          </Typography>
          <form className={classes.formSignUp}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={errors.email}
                error={Boolean(errors.email)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="username"
                label="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                helperText={errors.username}
                error={Boolean(errors.username)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Phone Number"
                id="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                helperText={errors.phone}
                error={Boolean(errors.phone)}
              />              
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="location"
                label="Your address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                helperText={errors.location}
                error={Boolean(errors.location)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={errors.password}
                error={Boolean(errors.password)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                label="Repeat password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                helperText={errors.confirmPassword}
                error={Boolean(errors.confirmPassword)}
              />
            </FormControl>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
          <Link
            className={classes.link}
            component="button"
            variant="body2"
            onClick={this.handleExecutorSignUp}
          >
            Sign Up as Executor
          </Link>
        </Paper>
      </div>
    );
  };
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 8,
    [theme.breakpoints.down(660)]: {
      marginLeft: 64,
      marginRight: 8
    },
    [theme.breakpoints.up(660)]: {
      width: 360,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  link: {
    marginTop: theme.spacing.unit * 2
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  formSignUp: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(SignUp);
