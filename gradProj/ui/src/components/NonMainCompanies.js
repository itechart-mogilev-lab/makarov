import React from "react";
import { withStyles } from "@material-ui/core";
import MainPageCompanies from "../containers/MainPageCompaniesContainer";

function NonMainCompanies(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MainPageCompanies />
    </div>
  );
}

const styles = theme => ({
  root: {
    width: 700,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down(660)]: {
      width: "auto",
      marginLeft: 57
    }
  }
});

export default withStyles(styles)(NonMainCompanies);
