import React, { Component } from "react";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel
} from "@material-ui/core";

class OrderFilters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : "",
    location: this.query.location ? this.query.location : ""
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersBookings({
      query,
      name: "type",
      value: event.target.value,
      path
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersBookings({
      query,
      name: `${event.target.name}`,
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <InputLabel htmlFor="type">Cleaning type</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleChange}
            className={classes.input}
            inputProps={{
              name: "type",
              id: "type"
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="standart">Standart</MenuItem>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="afterRepair">After repair</MenuItem>
            <MenuItem value="office">Office</MenuItem>
            <MenuItem value="industrial">Industrial</MenuItem>
          </Select>
          <TextField
            color="secondary"
            name="location"
            label="City"
            value={this.state.location}
            onChange={this.handleChange}
            className={classes.input}
          />
        </FormControl>
      </div>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  input: {
    margin: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(OrderFilters);
