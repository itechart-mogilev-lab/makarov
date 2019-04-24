import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Paper,
} from "@material-ui/core";

class OrderFromHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reason: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeReason = event => {
    this.setState({ reason: event.target.value })
  }

  handleAcceptBook = () => {
    this.props.acceptBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  }

  handleCancelBook = () => {
    if (this.props.role === "user" || this.props.role === "admin" ) {
      this.props.cancelBook({
        orderId: this.props.booking._id,
        query: this.props.search
      });
    } else if (this.props.role === "company") {
      this.handleClickOpen();
    }
  }

  handleCancelBookExecutor = () => {
    this.props.cancelBook({
      orderId: this.props.booking._id,
      query: this.props.search,
      reason: this.state.reason
    });
    this.handleClose();
  }

  handleConfirmBook = () => {
    this.props.confirmBook({
      orderId: this.props.booking._id,
      query: this.props.search
    });
  }

  render() {
    const { classes, booking } = this.props;
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const startDateFormat =
      startDate.getDate() +
      "." +
      startDate.getMonth() +
      "." +
      startDate.getFullYear();
    const endDateFormat =
      endDate.getDate() +
      "." +
      endDate.getMonth() +
      "." +
      endDate.getFullYear();

    const Days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let days = [];
    booking.cleaningDays.forEach(day => {
      days.push(Days[day]);
    });
    days = days.join(",");

    const RegularityNames = [
      "Ones",
      "Every week",
      "Every 2 week",
      "Every month"
    ];
    const regularity = RegularityNames[booking.regularity];

    const RecurrenceNames = [
      "None",
      "Contract for 2 weeks",
      "Contract for 1 month",
      "Contract for 2 months",
      "Contract for 3 months",
      "Contract for 4 months",
      "Contract for 5 months",
      "Contract for 6 months"
    ];
    const isReccurent = RecurrenceNames[booking.isReccurent];

    return (
      <Paper className={classes.listItem}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`${booking.type.toUpperCase()} CLEANING`}
            secondary={
              <>
                <Typography component="span" color="textPrimary">
                  <b>City:</b> {booking.location}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Adress:</b> {booking.adress}
                </Typography>
                {(booking.type === "office") |
                (booking.type === "industrial") ? (
                  <Typography component="span" color="textPrimary">
                    <b>Square meters:</b> {booking.squareMeters}
                  </Typography>
                ) : (
                  <>
                    <Typography component="span" color="textPrimary">
                      <b>Small rooms count:</b> {booking.smallRooms}
                    </Typography>
                    <Typography component="span" color="textPrimary">
                      <b>Big rooms count:</b> {booking.bigRooms}
                    </Typography>
                    <Typography component="span" color="textPrimary">
                      <b>Bath rooms count:</b> {booking.bathRooms}
                    </Typography>
                  </>
                )}
                <Typography component="span" color="textPrimary">
                  <b>Start date:</b> {startDateFormat}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Cleaning days:</b> {days}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>End date:</b> {endDateFormat}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Regularity:</b> {regularity}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Recurrence:</b> {isReccurent}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Company name:</b> {booking.companyName}
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Price:</b> {booking.price}$
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Time:</b> {booking.time}'
                </Typography>
                <Typography component="span" color="textPrimary">
                  <b>Status:</b> {booking.status}
                </Typography>
                {(this.props.role === "company") &
                (booking.status === "new") ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleAcceptBook}
                  >
                    Accept
                  </Button>
                ) : null}
                {(this.props.role === "user" || this.props.role === "admin") &
                (booking.status === "accepted") &
                (new Date(booking.endDate) < new Date()) ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleConfirmBook}
                  >
                    Confirm
                  </Button>
                ) : null}
                {booking.status === "new" ? (
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleCancelBook}
                  >
                    Cancel
                  </Button>
                ) : null}                
              </>
            }
          />
        </ListItem>
      </Paper>
    );
  }
}

const styles = theme => ({
  listItem: {
    width: 400,
    [theme.breakpoints.down(660)]: {
      width: "auto"
    },
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(OrderFromHistory);