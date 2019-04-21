import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import AttachMoney from '@material-ui/icons/AttachMoney';
import Date from "@material-ui/icons/InsertInvitation"
import Time from "@material-ui/icons/AccessTime";

class OrdersSort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: ""
    };
  }

  handleChange = event => {
    this.setState({ sortBy: event.target.value });

    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersBookings({
      query,
      name: "sortBy",
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <RadioGroup
        row
        className={classes.group}
        value={this.state.sortBy}
        onChange={this.handleChange}
      >

        <FormControlLabel
          value="price"
          control={<Radio icon={<AttachMoney />} checkedIcon={<AttachMoney />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />


        <FormControlLabel
          value="time"
          control={<Radio icon={<Time />} checkedIcon={<Time />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />


        <FormControlLabel
          value="date"
          control={<Radio icon={<Date />} checkedIcon={<Date />} color="secondary" classes={{ colorSecondary: classes.radio, checked: classes.checked }} />}
        />

      </RadioGroup>
    );
  }
}

const styles = theme => ({
  group: {
    justifyContent: "center"
  },
});

export default withStyles(styles)(OrdersSort);