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
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import SignInSchema from "../schemas/SignInSchema";

import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      referrer: null,
      push: false,
      redirectUrl: null
    };
  }

  handleRegister = () => {
    this.setState({
      push: true,
      redirectUrl: "/signup-executor"
    });
  };

  handleExecutorLogin = () => {
    this.setState({
      push: true,
      redirectUrl: "/signin-executor"
    });
  };

  componentDidUpdate(prevState) {
    const { redirectUrl } = this.state;
    if (!prevState.redirectUrl && redirectUrl) {
      this.setState({
        push: false,
        redirectUrl: null
      });
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={(values, { setFieldError }) => {
          try {
            this.props.executorSignIn(values.email, values.password);
          } catch (errors) {
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        validationSchema={SignInSchema}
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
      <main className={classes.main} onSubmit={handleSubmit}>
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
            Sign in
          </Typography>
          <Typography component="h1" variant="subtitle1">
            as Executor
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="email"
                label="Email"
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
            <Button
              onClick={handleSubmit}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <h4>
              <span>OR</span>
            </h4>
            <Button
              onClick={this.handleRegister}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitSignUp}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  };
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down(660)]: {
      marginLeft: 64
    },
    [theme.breakpoints.up(660)]: {
      width: 360,
      marginLeft: "auto",
      marginRight: "auto"
    }
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
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  },
  submitSignUp: {
    marginTop: theme.spacing.unit
  },
  googleImage: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit
  },
  signUpGoogle: {
    backgroundColor: "white",
    color: "black",
    "&:hover": {
      background: "#eeeeee"
    }
  }
});

export default withStyles(styles)(SignIn);
