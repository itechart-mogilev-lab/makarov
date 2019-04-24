import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Formik } from "formik";
import validationEditMain from "../schemas/EditCompanyInfo";
import validationNewPassword from "../schemas/EditCompanyPassword";
import validationTOC from "../schemas/EditCompanyPricing";

class EditCompany extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const {
      classes,
      username,
      email,
      phone,
      location,
      companyName,
      description,
      standartSmallRoom,
      standartBigRoom,
      standartBathRoom,
      generalBathRoom,
      generalBigRoom,
      generalSmallRoom,
      afterRepairBathRoom,
      afterRepairBigRoom,
      afterRepairSmallRoom,
      smallCarpet,
      bigCarpet,
      office,
      furniture,
      industrial,
      pool
    } = this.props;
    return (
      <div className={classes.root}>
        <Formik
          initialValues={{
            username,
            email,
            phone,
            location,
            companyName,
            description
          }}
          validationSchema={validationEditMain}
          onSubmit={(
            { username, email, phone, location, companyName, description },
            { setFieldError }
          ) => {
            try {
              this.props.editMainExecutor({
                username,
                email,
                phone,
                location,
                companyName,
                description
              });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.EditMainInfo}
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
              this.props.changePasswordExecutor({ oldPassword, newPassword });
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.NewPasswordForm}
        />
        <Formik
          initialValues={{
            standartSmallRoom,
            standartBigRoom,
            standartBathRoom,
            generalBathRoom,
            generalBigRoom,
            generalSmallRoom,
            afterRepairBathRoom,
            afterRepairBigRoom,
            afterRepairSmallRoom,
            smallCarpet,
            bigCarpet,
            office,
            furniture,
            industrial,
            pool
          }}
          validationSchema={validationTOC}
          onSubmit={(values, { setFieldError }) => {
            try {
              this.props.editTypesOfCleaningExecutor(values);
            } catch (errors) {
              errors.forEach(err => {
                setFieldError(err.field, err.error);
              });
            }
          }}
          component={this.TypesOfCleaningForm}
        />
      </div>
    );
  }

  EditMainInfo = ({
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
            (Username, Email, Address etc.)
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
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              helperText={errors.phone}
              error={Boolean(errors.phone)}
              className={classes.textField}
            />
            <TextField
              label="Company name"
              name="companyName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyName}
              helperText={errors.companyName}
              error={Boolean(errors.companyName)}
              className={classes.textField}
            />
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              helperText={errors.description}
              error={Boolean(errors.description)}
              className={classes.textField}
              multiline
              rowsMax="4"
            />
            <TextField
              label="Ardess"
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

  TypesOfCleaningForm = ({
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
        expanded={expanded === "panel3"}
        onChange={this.handleChange("panel3")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Pricing</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form
            className={classes.container}
            onSubmit={handleSubmit}
            noValidate
          >
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Standart cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true" className={classes.pricingColumnFlex}>
                  <TextField
                    label="Price per small room"
                    name="standartSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartSmallRoom}
                    helperText={errors.standartSmallRoom}
                    error={Boolean(errors.standartSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    name="standartBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartBigRoom}
                    helperText={errors.standartBigRoom}
                    error={Boolean(errors.standartBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    name="standartBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standartBathRoom}
                    helperText={errors.standartBathRoom}
                    error={Boolean(errors.standartBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                General cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true" className={classes.pricingColumnFlex}>
                  <TextField
                    label="Price per small room"
                    name="generalSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalSmallRoom}
                    helperText={errors.generalSmallRoom}
                    error={Boolean(errors.generalSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    name="generalBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalBigRoom}
                    helperText={errors.generalBigRoom}
                    error={Boolean(errors.generalBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    name="generalBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.generalBathRoom}
                    helperText={errors.generalBathRoom}
                    error={Boolean(errors.generalBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                After repair
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div flexwrap="true" className={classes.pricingColumnFlex}>
                  <TextField
                    label="Price per small room"
                    name="afterRepairSmallRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairSmallRoom}
                    helperText={errors.afterRepairSmallRoom}
                    error={Boolean(errors.afterRepairSmallRoom)}
                  />
                  <TextField
                    label="Price per big room"
                    name="afterRepairBigRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairBigRoom}
                    helperText={errors.afterRepairBigRoom}
                    error={Boolean(errors.afterRepairBigRoom)}
                  />
                  <TextField
                    label="Price per bathroom"
                    name="afterRepairBathRoom"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.afterRepairBathRoom}
                    helperText={errors.afterRepairBathRoom}
                    error={Boolean(errors.afterRepairBathRoom)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Carpet cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.pricingColumnFlex}>
                  <TextField
                    label="Price per small carpet"
                    name="smallCarpet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.smallCarpet}
                    helperText={errors.smallCarpet}
                    error={Boolean(errors.smallCarpet)}
                  />
                  <TextField
                    label="Price per big carpet"
                    name="bigCarpet"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bigCarpet}
                    helperText={errors.bigCarpet}
                    error={Boolean(errors.bigCarpet)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                Other cleaning
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.pricingColumnFlex} flexwrap="true">
                  <TextField
                    label="Office, per sqr meter"
                    name="office"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.office}
                    helperText={errors.office}
                    error={Boolean(errors.office)}
                  />
                  <TextField
                    label="Furniture cleaning"
                    name="furniture"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.furniture}
                    helperText={errors.furniture}
                    error={Boolean(errors.furniture)}
                  />
                  <TextField
                    label="Industrial, per sqr meter"
                    name="industrial"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.industrial}
                    helperText={errors.industrial}
                    error={Boolean(errors.industrial)}
                  />
                  <TextField
                    label="Pool, for one"
                    name="pool"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pool}
                    helperText={errors.pool}
                    error={Boolean(errors.pool)}
                  />
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing.unit,
  },
  textField: {
    marginBottom: "5px",
  },  
  secondaryHeading: {
    color: theme.palette.text.secondary
  },
  pricingColumnFlex: {    
    display: "flex",
    flexDirection: "column"
  },
  mainInfoAndPassword: {
    display: "flex",
    flexWrap: "wrap"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1
  }
});

export default withStyles(styles)(EditCompany);
