import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";
import CompaniesList from "./CompaniesList";
import SortingContainer from "../containers/SortingContainer";
import PagePicker from "../components/Pagination";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class MainPageCompanies extends Component {
  componentDidMount() {
    this.props.loadCompanies(this.props.search);
  }

  handleQueryChange = current => {
    const query = this.props.search;
    const path = this.props.pathname;

    this.props.changeFiltersCompanies({
      query,
      name: "page",
      value: current,
      path
    });
  };

  render() {
    const { classes, page, limit, total } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Choose ur fighter!
        </Typography>
        <div className={classes.sortAndList}>
          <SortingContainer />
          <List className={classes.list}>
            <CompaniesList companies={this.props.companies} />
          </List>
        </div>
        <PagePicker
          className={classes.pages}
          page={page}
          limit={limit}
          total={total}
          handleQueryChange={this.handleQueryChange}
        />
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
    paddingTop: 8,
    [theme.breakpoints.down(660)]: {
      padding: 4,
    }
  },
  sortAndList: {
    width: "100%"
  },
  companies: {
    marginLeft: 0
  },
  list: {
    width: "100%",
    paddingTop: 0
  }
});

export default withStyles(styles)(MainPageCompanies);
