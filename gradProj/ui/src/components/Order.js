import React from "react";
import { Field } from "formik";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { Select } from "material-ui-formik-components/Select";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import Footer from "./Footer";

function OrderForm(props) {
  const {
    classes,
    handleSubmit,
    handleChange,
    values,
    typesOfCleaning
  } = props;

  function handleCalcPrice() {
    props.calculateTimePrice({ values, typesOfCleaning });
  }

  let availableWorkingDays = [];
  if (props.availableWorkingDays) {
    if (props.availableWorkingDays["0"])
      availableWorkingDays.push({ value: 0, label: "Sunday" });
    if (props.availableWorkingDays["1"])
      availableWorkingDays.push({ value: 1, label: "Monday" });
    if (props.availableWorkingDays["2"])
      availableWorkingDays.push({ value: 2, label: "Tuesday" });
    if (props.availableWorkingDays["3"])
      availableWorkingDays.push({ value: 3, label: "Wednesday" });
    if (props.availableWorkingDays["4"])
      availableWorkingDays.push({ value: 4, label: "Thursday" });
    if (props.availableWorkingDays["5"])
      availableWorkingDays.push({ value: 5, label: "Friday" });
    if (props.availableWorkingDays["6"])
      availableWorkingDays.push({ value: 6, label: "Saturday" });
  }

  let availableServices = [];
  let availableTypes = [];
  if (typesOfCleaning) {
    if (typesOfCleaning.pool > 0)
      availableServices.push({ value: "pool", label: "Pool cleaning" });
    if (typesOfCleaning.carpet.isAvailable)
      availableServices.push({ value: "carpet", label: "Carpet cleaning" });
    if (typesOfCleaning.furniture > 0)
      availableServices.push({
        value: "furniture",
        label: "Furniture cleaning"
      });

    if (typesOfCleaning.standart.isAvailable)
      availableTypes.push({ value: "standart", label: "Standart" });
    if (typesOfCleaning.general.isAvailable)
      availableTypes.push({ value: "general", label: "General" });
    if (typesOfCleaning.afterRepair.isAvailable)
      availableTypes.push({ value: "afterRepair", label: "After repair" });
    if (typesOfCleaning.office > 0)
      availableTypes.push({ value: "office", label: "Office" });
    if (typesOfCleaning.industrial > 0)
      availableTypes.push({ value: "industrial", label: "Industrial" });
  }

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Paper className={classes.mainPaper}>
            <h4 className={classes.divider}>
              <span>BOOKING FORM</span>
            </h4>
            <form className={classes.container} onSubmit={handleSubmit}>
              {!props.company ? (
                <TextField
                  required
                  id="location"
                  label="City"
                  className={classes.input}
                  value={values.location}
                  onChange={handleChange}
                />
              ) : null}
              <TextField
                required
                id="adress"
                label="Adress"
                className={classes.input}
                value={values.adress}
                onChange={handleChange}
              />
              <Field
                required
                fullWidth={false}
                name="type"
                label="Type of cleaning"
                className={classes.input}
                options={
                  props.company
                    ? availableTypes
                    : [
                        { value: "standart", label: "Standart" },
                        { value: "general", label: "General" },
                        { value: "afterRepair", label: "After repair" },
                        { value: "office", label: "Office" },
                        { value: "industrial", label: "Industrial" }
                      ]
                }
                component={Select}
              />
              {(values.type === "standart") |
              (values.type === "general") |
              (values.type === "afterRepair") ? (
                <>
                  <TextField
                    required
                    id="smallRooms"
                    label="Small rooms count"
                    className={classes.input}
                    value={values.smallRooms}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="bigRooms"
                    label="Big rooms count"
                    className={classes.input}
                    value={values.bigRooms}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="bathRooms"
                    label="Bathrooms count"
                    className={classes.input}
                    value={values.bathRooms}
                    onChange={handleChange}
                  />
                </>
              ) : (values.type === "office") |
                (values.type === "industrial") ? (
                <TextField
                  required
                  id="squareMeters"
                  label="Size (square meters)"
                  className={classes.input}
                  value={values.squareMeters}
                  onChange={handleChange}
                />
              ) : null}
              <Field
                multiple
                name="service"
                label="Other service"
                options={
                  props.company
                    ? availableServices
                    : [
                        { value: "pool", label: "Pool cleaning" },
                        { value: "carpet", label: "Carpet cleaning" },
                        { value: "furniture", label: "Furniture cleaning" }
                      ]
                }
                component={Select}
              />
              {values.service.indexOf("carpet") !== -1 ? (
                <>
                  <TextField
                    required
                    id="smallCarpets"
                    label="Small carpet count"
                    className={classes.input}
                    value={values.smallCarpets}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="bigCarpets"
                    label="Big carpet count"
                    className={classes.input}
                    value={values.bigCarpets}
                    onChange={handleChange}
                  />
                </>
              ) : null}
              <DatePicker
                id="startDate"
                value={values.startDate}
                onChange={handleChange}
                disablePast
                className={classes.input}
                label="Start date"
              />
              <TimePicker
                id="expectedTime"
                value={values.exptectedTime}
                onChange={handleChange}
                className={classes.input}
                label="Expected time of cleaning"
              />
              <Field
                required
                multiple
                className={classes.input}
                name="cleaningDays"
                label="Cleaning days"
                options={
                  props.company
                    ? availableWorkingDays
                    : [
                        { value: 0, label: "Sunday" },
                        { value: 1, label: "Monday" },
                        { value: 2, label: "Tuesday" },
                        { value: 3, label: "Wednesday" },
                        { value: 4, label: "Thursday" },
                        { value: 5, label: "Friday" },
                        { value: 6, label: "Saturday" }
                      ]
                }
                component={Select}
              />
              <Field
                required
                className={classes.input}
                name="regularity"
                label="Regularity"
                options={[
                  { value: 0, label: "Once" },
                  { value: 1, label: "Every week" },
                  { value: 2, label: "Every 2 weeks" },
                  { value: 3, label: "Every month" }
                ]}
                component={Select}
              />
              {values.regularity !== 0 ? (
                <Field
                  required
                  fullWidth={false}
                  className={classes.input}
                  name="recurrence"
                  label="Recurrence"
                  options={[
                    { value: 1, label: "2 weeks" },
                    { value: 2, label: "1 month" },
                    { value: 3, label: "2 month" },
                    { value: 4, label: "3 month" },
                    { value: 5, label: "4 month" },
                    { value: 6, label: "5 month" },
                    { value: 7, label: "6 month" }
                  ]}
                  component={Select}
                />
              ) : null}

              {props.isAuthenticated ? null : (
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.input}
                  value={values.email}
                  onChange={handleChange}
                />
              )}
              {props.company ? (
                <>
                  <Button
                    onClick={handleCalcPrice}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Calculate time and price
                  </Button>
                  {props.time && props.price ? (
                    <div className={classes.priceAndTime}>
                      <Typography className={classes.calcTitle}>
                        <b>Price:</b> {props.price}
                      </Typography>
                      <Typography className={classes.calcTitle}>
                        <b>Time:</b> {props.time}
                      </Typography>
                    </div>
                  ) : null}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.button}
                  >
                    Confirm order
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Look for offers
                </Button>
              )}
              {props.company ? (
                <>
                  <Button
                    component={Link}
                    color="primary"
                    to={{ pathname: `/companies/${props.company}` }}
                  >
                    go to company
                  </Button>
                  <Button
                    onClick={props.resetSelectedCompany}
                    color="secondary"
                  >
                    reset selected company
                  </Button>
                </>
              ) : null}
            </form>
          </Paper>
        </MuiPickersUtilsProvider>
      </div>
      <Footer />
    </div>
  );
}

const styles = theme => ({
  root: {
    textAlign: "left",
    flexDirection: "column",
    marginLeft: theme.spacing.unit * 8,
    [theme.breakpoints.down(660)]: {
      marginLeft: "57px"
    }
  },
  main: {
    marginTop: 20,

    display: "flex",
    justifyContent: "center"
  },
  mainPaper: {
    [theme.breakpoints.up(660)]: {
      width: "400px"
    },
    width: "100%",
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  container: {
    [theme.breakpoints.up(400)]: {
      padding: "0 40px"
    },
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center"
  },
  input: {
    marginBottom: 20
  },
  priceAndTime: {
    display: "flex"
  },
  calcTitle: {
    marginLeft: 8,
    marginTop: 8
  }
});

export default withStyles(styles)(OrderForm);
