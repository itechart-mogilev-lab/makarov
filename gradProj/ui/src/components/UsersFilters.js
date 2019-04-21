import React, { Component } from "react";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  TextField
} from "@material-ui/core";

class UsersFilters extends Component {
  query = parse(this.props.search);

  state = {
    username: this.query.username ? this.query.username : "",
    location: this.query.location ? this.query.location : "",
    email: this.query.email ? this.query.email : "",
    phone: this.query.phone ? this.query.phone : ""
  };

  handleChangeQuery = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCustomers({
      query,
      name: `${event.target.name}`,
      value: event.target.value,
      path
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <TextField
          color="secondary"
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Adress"
          name="location"
          value={this.state.location}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
        <TextField
          color="secondary"
          label="Phone number"
          name="phone"
          value={this.state.phone}
          onChange={this.handleChangeQuery}
          className={classes.textfield}
        />
      </FormControl>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  textfield: {
    marginBottom: 10
  }
});

export default withStyles(styles)(UsersFilters);
