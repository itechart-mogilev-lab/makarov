import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Paper } from "@material-ui/core";
import { Formik } from "formik";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import validationEditProfile from "../schemas/EditUserInfo";
import validationNewPassword from "../schemas/EditUserPassword";

class EditUser extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, username, email, phone, location } = this.props;
    return (
      <Paper className={classes.root}>
        <Formik
          initialValues={{ username, email, phone, location }}
          validationSchema={validationEditProfile}
          onSubmit={(
            { username, email, phone, location },
            { setFieldError }
          ) => {
            try {
              this.props.editUser({ username, email, phone, location });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.EditProfileForm}
        />
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          }}
          validationSchema={validationNewPassword}
          onSubmit={({ oldPassword, newPassword }, { setFieldError }) => {
            try {
              this.props.changePasswordUser({ oldPassword, newPassword });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.NewPasswordForm}
        />
      </Paper>
    );
  }

  EditProfileForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={this.handleChange("panel1")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Main Info</Typography>
          <Typography className={classes.secondaryHeading}>
            (Username, Email, Phone, Address)
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form
            className={classes.container}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              label="Username"
              autoComplete="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              helperText={errors.username}
              error={Boolean(errors.username)}
              className={classes.textField}
            />
            <TextField
              label="Email"
              autoComplete="email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              helperText={errors.email}
              error={Boolean(errors.email)}
              className={classes.textField}
            />
            <TextField
              label="Phone number"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              helperText={errors.phone}
              error={Boolean(errors.phone)}
              className={classes.textField}
            />
            <TextField
              label="Your adress"
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              helperText={errors.location}
              error={Boolean(errors.location)}
              className={classes.textField}
            />
            <Button
              key="submit"
              type="submit"
              color="primary"
              size="large"
            >
              CONFIRM
            </Button>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  NewPasswordForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors
  }) => {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={this.handleChange("panel2")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Password</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form
            className={classes.container}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              label="Old password"
              type="password"
              name="oldPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword}
              helperText={errors.oldPassword}
              error={Boolean(errors.oldPassword)}
              className={classes.textField}
            />
            <TextField
              label="New password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              helperText={errors.newPassword}
              error={Boolean(errors.newPassword)}
              className={classes.textField}
            />
            <TextField
              label="Confirm new password"
              type="password"
              name="confirmNewPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmNewPassword}
              helperText={errors.confirmNewPassword}
              error={Boolean(errors.confirmNewPassword)}
              className={classes.textField}
            />
            <Button
              key="submit"
              type="submit"
              color="primary"
              size="large"
            >
              CHANGE PASSWORD
            </Button>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    
  },
  secondaryHeading: {
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
  },
  textField: {
    marginBottom: "5px",
  },
});

export default withStyles(styles)(EditUser);
