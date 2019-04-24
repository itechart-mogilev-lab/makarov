import React, { Component } from "react";
import { parse } from "query-string";
import {
  withStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField
} from "@material-ui/core";

class Filters extends Component {
  query = parse(this.props.search);

  state = {
    type: this.query.type ? this.query.type : "standart",
    carpet: this.query.carpet ? true : false,
    furniture: this.query.furniture ? true : false,
    pool: this.query.pool ? true : false,
    location: ""
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCompanies({
      query,
      name: "type",
      value: event.target.value,
      path
    });
  };

  handleChangeCity = event => {
    this.setState({ location: event.target.value });

    const path = this.props.pathname;
    const query = this.props.search;

    this.props.changeFiltersCompanies({
      query,
      name: "location",
      value: event.target.value,
      path
    });
  };

  handleChangeSecondaryCallback = name => {
    const path = this.props.pathname;
    const query = this.props.search;

    if (this.state[name] === true) {
      this.props.changeFiltersCompanies({
        query,
        name: `${name}`,
        value: true,
        path
      });
    } else {
      this.props.changeFiltersCompanies({
        query,
        name: `${name}`,
        value: undefined,
        path
      });
    }
  };

  handleChangeSecondary = name => event => {
    this.setState({ [name]: !this.state[name] }, () =>
      this.handleChangeSecondaryCallback(name)
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" />
        <TextField
          color="secondary"
          label="City"
          value={this.state.location}
          onChange={this.handleChangeCity}
          className={classes.city}
        />
        <FormLabel component="legend">Type of cleaning</FormLabel>
        <RadioGroup
          className={classes.group}
          value={this.state.type}
          onChange={this.handleChangeType}
        >
          <FormControlLabel
            value="standart"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Standart"
          />
          <FormControlLabel
            value="general"
            control={<Radio color="secondary" className={classes.radio} />}
            label="General"
          />
          <FormControlLabel
            value="afterRepair"
            control={<Radio color="secondary" className={classes.radio} />}
            label="After repair"
          />
          <FormControlLabel
            value="industrial"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Industrial"
          />
          <FormControlLabel
            value="office"
            control={<Radio color="secondary" className={classes.radio} />}
            label="Office"
          />
        </RadioGroup>
        <FormLabel className={classes.group} component="legend">
          Other cleanings
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.carpet}
              onChange={this.handleChangeSecondary("carpet")}
              className={classes.padding}
            />
          }
          label="Carpet"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.furniture}
              onChange={this.handleChangeSecondary("furniture")}
              className={classes.checkbox}
            />
          }
          label="Furniture"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.pool}
              onChange={this.handleChangeSecondary("pool")}
              className={classes.checkbox}
            />
          }
          label="Pool"
        />
      </FormControl>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  radio: {
    padding: 0,
    margin: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit*1.7,
    marginRight: 12
  },
  checkbox: {
    
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  city: {
    marginBottom: 10
  }
});

export default withStyles(styles)(Filters);
