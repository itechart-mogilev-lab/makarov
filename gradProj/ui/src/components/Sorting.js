import React, { Component } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import AttachMoney from "@material-ui/icons/AttachMoney";
import StarRate from "@material-ui/icons/StarRate";
import ShowChart from "@material-ui/icons/ShowChart";

class Sort extends Component {
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

    this.props.changeFiltersCompanies({
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
          control={
            <Radio
              icon={<AttachMoney />}
              checkedIcon={<AttachMoney />}
              color="secondary"
            />
          }
        />

        <FormControlLabel
          value="rating"
          control={
            <Radio
              icon={<StarRate />}
              checkedIcon={<StarRate />}
              color="secondary"
            />
          }
        />

        <FormControlLabel
          value="popularity"
          control={
            <Radio
              icon={<ShowChart />}
              checkedIcon={<ShowChart />}
              color="secondary"
            />
          }
        />
      </RadioGroup>
    );
  }
}

const styles = theme => ({
  group: {
    marginLeft: 35,
    justifyContent: "center"
  }
});

export default withStyles(styles)(Sort);
