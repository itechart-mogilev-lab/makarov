import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Formik, Field } from "formik";
import CompanySchema from "../schemas/SignUpCompanySchema";
import { TextField } from "@material-ui/core";
import { Select } from "material-ui-formik-components/Select";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };
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
          companyName: "",
          description: "",
          workingDays: [],
          location: "",
          standartSmallRoom: 0,
          standartBigRoom: 0,
          standartBathRoom: 0,
          generalBathRoom: 0,
          generalBigRoom: 0,
          generalSmallRoom: 0,
          afterRepairBathRoom: 0,
          afterRepairBigRoom: 0,
          afterRepairSmallRoom: 0,
          smallCarpet: 0,
          bigCarpet: 0,
          office: 0,
          furniture: 0,
          industrial: 0,
          pool: 0
        }}
        onSubmit={(values, { setFieldError }) => {
          try {
            this.props.executorSignUp(values);
          } catch (errors) {
            errors.forEach(err => {
              setFieldError(err.field, err.error);
            });
          }
        }}
        validationSchema={CompanySchema}
        component={this.form}
      />
    );
  }

  form = ({ values, errors, handleBlur, handleChange, handleSubmit }) => {
    const { classes } = this.props;
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
            Sign up
          </Typography>
          <Typography component="h1" variant="subtitle1">
            as Executor
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
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                helperText={errors.username}
                error={Boolean(errors.username)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="companyName"
                label="Company name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                helperText={errors.companyName}
                error={Boolean(errors.companyName)}
              />
            </FormControl>
              <Field
                required
                multiple
                className={classes.input}
                name="workingDays"
                label="Working days"
                options={[
                  { value: 0, label: "Sunday" },
                  { value: 1, label: "Monday" },
                  { value: 2, label: "Tuesday" },
                  { value: 3, label: "Wednesday" },
                  { value: 4, label: "Thursday" },
                  { value: 5, label: "Friday" },
                  { value: 6, label: "Saturday" }
                ]}
                component={Select}
              />
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="location"
                label="Location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                helperText={errors.location}
                error={Boolean(errors.location)}
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

            <TextField
              label="Descrition"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              helperText={errors.description}
              error={Boolean(errors.description)}
              multiline
              fullWidth
            />
            <h4 className={classes.pricing}>
              <span>PRICING</span>
            </h4>

            <Grid container justify="center" spacing={24}>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    Standart cleaning
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div flexwrap="true">
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per small room"
                          name="standartSmallRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.standartSmallRoom}
                          helperText={errors.standartSmallRoom}
                          error={Boolean(errors.standartSmallRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per big room"
                          name="standartBigRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.standartBigRoom}
                          helperText={errors.standartBigRoom}
                          error={Boolean(errors.standartBigRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per bathroom"
                          name="standartBathRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.standartBathRoom}
                          helperText={errors.standartBathRoom}
                          error={Boolean(errors.standartBathRoom)}
                        />
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    General cleaning
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div flexwrap="true">
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per small room"
                          name="generalSmallRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.generalSmallRoom}
                          helperText={errors.generalSmallRoom}
                          error={Boolean(errors.generalSmallRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per big room"
                          name="generalBigRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.generalBigRoom}
                          helperText={errors.generalBigRoom}
                          error={Boolean(errors.generalBigRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per bathroom"
                          name="generalBathRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.generalBathRoom}
                          helperText={errors.generalBathRoom}
                          error={Boolean(errors.generalBathRoom)}
                        />
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    After repair cleaning
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div flexwrap="true">
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per small room"
                          name="afterRepairSmallRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.afterRepairSmallRoom}
                          helperText={errors.afterRepairSmallRoom}
                          error={Boolean(errors.afterRepairSmallRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per big room"
                          autoComplete="tel"
                          name="afterRepairBigRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.afterRepairBigRoom}
                          helperText={errors.afterRepairBigRoom}
                          error={Boolean(errors.afterRepairBigRoom)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per bathroom"
                          autoComplete="tel"
                          name="afterRepairBathRoom"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.afterRepairBathRoom}
                          helperText={errors.afterRepairBathRoom}
                          error={Boolean(errors.afterRepairBathRoom)}
                        />
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    Carpet cleaning
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div flexwrap="true">
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per small carpet"
                          name="smallCarpet"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.smallCarpet}
                          helperText={errors.smallCarpet}
                          error={Boolean(errors.smallCarpet)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Price per big carpet"
                          name="bigCarpet"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bigCarpet}
                          helperText={errors.bigCarpet}
                          error={Boolean(errors.bigCarpet)}
                        />
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
              <Grid item>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    Other cleaning
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div flexwrap="true">
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Office cleaning, per square meter"
                          name="office"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.office}
                          helperText={errors.office}
                          error={Boolean(errors.office)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Furniture cleaning"
                          name="furniture"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.furniture}
                          helperText={errors.furniture}
                          error={Boolean(errors.furniture)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Industrial cleaning, per square meter"
                          name="industrial"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.industrial}
                          helperText={errors.industrial}
                          error={Boolean(errors.industrial)}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Pool cleaning, for one"
                          name="pool"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pool}
                          helperText={errors.pool}
                          error={Boolean(errors.pool)}
                        />
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
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
    textAlign: "auto",
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit,
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
  pricing: {
    margin: `${theme.spacing.unit * 4}px 0px`
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
